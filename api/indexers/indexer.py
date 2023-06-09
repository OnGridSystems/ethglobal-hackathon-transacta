import os
import logging
import json
import time
from typing import Union
from datetime import datetime

import django
import requests
import web3
from web3 import Web3
from django.conf import settings
from web3.middleware import geth_poa_middleware
from web3.types import Address, ChecksumAddress


class IndexerException(Exception):
    pass


log = logging.getLogger(__name__)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

STEP = 1000


class Indexer:

    def update_token_data(self, event, token):
        """
        Write data to token from event and save
        """
        timestamp_from_block = self.w3.eth.get_block(event.blockNumber)['timestamp']
        timestamp_from_database = token.blockchain_timestamp
        if timestamp_from_database is None:
            log.info(f"    Update token: It is the very first time when token "
                     f"with token id = {token.token_id} is being written")
            timestamp_from_database = 0
        if timestamp_from_database < timestamp_from_block:
            log.info(f"    Update token: Database contained old data for token: {token}. ")
            log.info(f"    Update token: Last update time stored in db is: "
                     f"{datetime.fromtimestamp(timestamp_from_database)}")
            log.info(f"    Update token: Current block time is {datetime.fromtimestamp(timestamp_from_block)}")
            if self.chain_id != token.chain_id and token.chain_id is not None:
                log.info(
                    f"    Update token: token has been relocated from chain {token.chain_id} to {self.chain_id}")
            token.owner = event.args.to
            token.chain_id = self.chain_id
            token.tx = event.transactionHash.hex()
            token.block_number = event.blockNumber
            token.blockchain_timestamp = timestamp_from_block
            token.save()
            log.info(f"    Update token: Now database contains new data for token: {token}")

    def get_token_by_address_and_abi(self, address: Union[Address, ChecksumAddress],
                                     abi_file_name: str) -> web3.contract.Contract:
        """
        Methods obtains a Contract object from address and ABI filename
        """
        with open(abi_file_name, 'r') as f:
            data = json.load(f)
        return self.w3.eth.contract(abi=data['abi'], address=address)

    def __init__(
            self,
            upstream: str,
            token_address: str,
            token_abi_filename: str,
            indexer_interval: int,
    ):
        django.setup()
        self.storage_media = settings.MEDIA_ROOT
        log.info(f"Init stage: storage media path is {self.storage_media}")
        from transacta.models import Token, Status
        self.token_model = Token
        self.status_model = Status
        self.indexer_interval = indexer_interval
        log.info(f"Init stage: indexer interval is {self.indexer_interval} s")
        self.w3 = Web3(Web3.HTTPProvider(upstream, request_kwargs={'timeout': 120}))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        self.chain_id = self.w3.eth.chain_id
        log.info(f"Init stage: chain id is {self.chain_id}")

        self.token_address = self.w3.to_checksum_address(token_address)
        log.info(f"Init stage: token contract address is {self.token_address}")

        self.token_contract = self.get_token_by_address_and_abi(self.token_address, token_abi_filename)
        log.info(f"Init stage: successfully created token contract. Ready to start")

    def get_token_metadata_from_contract(self, token_id: int) -> dict:
        """
        Receive metadata (dict with token info: image, params, etc.)
        It consists of 3 stages:
        1) Go to contract method tokenURI(uint256 tokenId) and get uri for file with metadata
        2) Go to received in step (1) uri and get JSON file
        3) Convert JSON file contents to dict and return it
        If on step (1) or (2) there is a failure, IndexerException is raised
        """
        try:
            token_uri: str = self.token_contract.functions.tokenURI(token_id).call()
            log.info(f"    Receiving metadata: Received for token_id: {token_id} tokenURI: {token_uri}.")
        except Exception as e:
            log.error(f"    Receiving metadata: ERROR: Attempted to get tokenURI from contract for token_id={token_id}"
                      f" at chain_id={self.chain_id}, but caught an error: {e}")
            raise IndexerException(f"Exception {e} while receiving tokenURI for token_id={token_id}")
        try:
            a = requests.get(f"https://transacta.ongrid.pro/{token_uri}")
            return a.json()
        except Exception as e:
            log.error(f"    Receiving metadata: ERROR: Attempted to download metadata, caught error {e}."
                      f" Seems like restarting indexer must be enough to solve this.")

    def get_new_tokens(self, event):
        """
        Main method of writing data to database.
        If the token is new it is created and stored in DB.
        Otherwise, it will be updated with data from event
        """
        empty_string = ''
        token_id = event.args.tokenId
        try:
            token = self.token_model.objects.get(token_id=token_id)
            log.info(f"  Index new token: token with  token_id={token_id} already exists")
        except self.token_model.DoesNotExist:
            log.info(f"  Index new token: Token with token_id={token_id} does not exist. Creating new one")
            token = self.token_model(token_id=token_id)
            token_metadata = self.get_token_metadata_from_contract(token_id)
            if image_uri_from_metadata := token_metadata.get('image'):
                log.info(f"  Index new token: Metadata contains image uri, removing https://ipfs.io/ipfs/ from this:"
                         f" {image_uri_from_metadata}")
                token.token_url = image_uri_from_metadata
            else:
                log.info("  Index new token: Metadata does not contain image uri, providing empty string")
                token.token_url = empty_string

        self.update_token_data(event, token)

    def main_cycle_body(self):
        """
        Main cycle body where events are filtered by block
        """
        status = self.status_model.objects.get(chain_id=self.chain_id)
        first_block = status.indexed_block
        log.info(f"Cycle body: obtained first block from database: {first_block}")
        last_block = self.w3.eth.get_block('latest')['number']
        log.info(f"Cycle body: obtained last block from blockchain: {last_block}")
        log.info(f"Cycle body: start index process from {first_block} block to {last_block}...")

        for block_number in range(first_block, last_block, STEP):
            log.info("Cycle body: sleep...")
            time.sleep(self.indexer_interval)
            log.info(f"Cycle body: current index block: {block_number}")

            event_transfer = self.token_contract.events.Transfer.get_logs(
                fromBlock=block_number,
                toBlock=block_number + STEP
            )
            print(event_transfer)
            log.info(f"Cycle body: obtained {len(event_transfer)} events")
            '''
            for event in events:
                if event.args.to == self.bridge_address \
                        or event.args.to == '0x0000000000000000000000000000000000000000':
                    log.info(
                        f"Cycle body: token id {event.args.tokenId} is on bridge: {self.bridge_address}. "
                        f"Seems token is being burned or transferred to another chain")
                    continue
                else:
                    log.info(f"Cycle body: token id {event.args.tokenId} "
                             f"is taken from {event.args['from']} to {event.args.to}")

                    self.index_new_token(event)
            '''
            status.indexed_block = last_block + 1 if block_number + STEP > last_block else block_number + STEP + 1
            status.save()
            log.info(f"Cycle body: next block number: {status.indexed_block}")

    def main_cycle(self):
        """
        Main cycle of indexer
        If there's IndexerException caught, indexer will be shut down with status code 1
        """
        try:
            while True:
                self.main_cycle_body()
                log.info(f"Cycle end: yet another cycle is passed. Sleeping for {self.indexer_interval} seconds")
                time.sleep(self.indexer_interval)
        except IndexerException as e:
            log.error(f"Shutting down indexer because error occurred: {e}")
            exit(1)
