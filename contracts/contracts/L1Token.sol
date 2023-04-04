// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title L1Token
 * @author OnGrid Dev Team
 **/
contract L1Token is ERC721Enumerable, Ownable {
    using Strings for uint256;

    constructor() ERC721("Grizzly", "GRZL") {}

    /**
     * @dev Mints a specific to the given address
     * @param to the receiver
     */
    function mint(address to) public {
        uint256 mintIndex = totalSupply();
        _safeMint(to, mintIndex);
    }
}
