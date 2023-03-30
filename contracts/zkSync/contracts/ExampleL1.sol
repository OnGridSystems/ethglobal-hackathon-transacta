//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Importing zkSync contract interface
import "@matterlabs/zksync-contracts/l1/contracts/zksync/interfaces/IZkSync.sol";

contract Example {
    address contractL2;
    function callZkSync(
        // The address of the zkSync smart contract.
        // It is not recommended to hardcode it during the alpha testnet as regenesis may happen.
        address _zkSyncAddress
    ) external payable returns(bytes32 txHash) {
        IZkSync zksync = IZkSync(_zkSyncAddress);
        // calling L2 smart contract from L1 Example contract
        txHash = zksync.requestL2Transaction{value: msg.value}(
            // The address of the L2 contract to call
            contractL2,
            // We pass no ETH with the call
            0,
            // Encoding the calldata for the execute
            abi.encodeWithSignature("someMethod()"),
            // Gas limit
            10000,
            // gas price per pubdata byte
            800,
            // factory dependencies
            new bytes[](0),
            // refund address
            address(0)
        );
    }
    function getAddress() public returns(address){
        return contractL2;
    }
    function setAddress(address addr) public {
        contractL2 = addr;
    }
}
