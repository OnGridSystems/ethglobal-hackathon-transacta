// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./L2Token.sol";

contract L2TokenMinter {
    address ownedContract;
    address owner;

    constructor () {
        owner = msg.sender;
    }

    function setOwnedContract (address owned) public {
        ownedContract = owned;
    }

    function mintL2 (address to) public {
        L2Token proxied = L2Token(ownedContract);
        proxied.mint(to);
    }
}