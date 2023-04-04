// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./L2TokenMinter.sol";

/**
 * @title L2Token
 * @author OnGrid Dev Team
 **/
contract L2Token is ERC721Enumerable, Ownable {
    using Strings for uint256;

    constructor(
        L2TokenMinter minter
    ) ERC721("Grizzly", "GRZL") {
        transferOwnership(address(minter));
        L2TokenMinter a = L2TokenMinter(address(minter));
        a.setOwnedContract(address(this));
    }

    /**
     * @dev Mints a specific to the given address
     * @param to the receiver
     */
    function mint(address to) public onlyOwner {
        uint256 mintIndex = totalSupply();
        _safeMint(to, mintIndex);
    }

    function burn(uint256 id) public onlyOwner {
        _burn(id);
    }
}
