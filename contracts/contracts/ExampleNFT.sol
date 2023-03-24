// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title L1Token
 * @author OnGrid Dev Team
 **/
contract ExampleNFT is ERC721Enumerable, AccessControl {
    using Strings for uint256;


    constructor() ERC721("Grizzly", "GRZL") {}


    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Mints a specific to the given address
     * @param to the receiver
     */
    function mint(address to) public {
        uint256 mintIndex = totalSupply();
        _safeMint(to, mintIndex);
    }
}
