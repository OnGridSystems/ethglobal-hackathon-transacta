//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "./IScrollMessenger.sol";

contract L2Contract {
    string private greeting;
    address l1Contract;
    address l2Messenger;
    uint256 public tokenId;
    address public to;

    event ReceiveMessage(
        uint256 _tokentId,
        address _to
    );

    constructor(address _l1Contract, address _l2Messenger) {
      l1Contract = _l1Contract;
      l2Messenger = _l2Messenger;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function receiveMessage( uint256 _tokenId,address _to) public {
        tokenId = _tokenId;
        to = _to;
        emit ReceiveMessage(_tokenId,_to);
    }

    function setGreeting(string memory _greeting) public {
        require(msg.sender == l2Messenger);
        require(l1Contract == IScrollMessenger(l2Messenger).xDomainMessageSender());
        greeting = _greeting;
    }
}