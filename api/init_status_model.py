import logging
import os

import django

log = logging.getLogger(__name__)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')


def main():
    Status.objects.get_or_create(
        chain_id=os.environ['ZKSYNC_CHAIN_ID'],
        defaults={
            'indexed_block': os.environ['ZKSYNC_START_BLOCK']
        })

    Status.objects.get_or_create(
        chain_id=os.environ['ETH_CHAIN_ID'],
        defaults={
            'indexed_block': os.environ['ETH_START_BLOCK']
        })

    # polygon config
    Status.objects.get_or_create(
        chain_id=os.environ['POLYGON_ZK_EVM_ID'],
        defaults={
            'indexed_block': os.environ['POLYGON_ZK_EVM_START_BLOCK']
        })

    Status.objects.get_or_create(
        chain_id=os.environ['SCROLL_CHAIN_ID'],
        defaults={
            'indexed_block': os.environ['SCROLL_START_BLOCK']
        })

    log.info('successfully created')


if __name__ == '__main__':
    django.setup()
    from transacta.models import Status
    main()
