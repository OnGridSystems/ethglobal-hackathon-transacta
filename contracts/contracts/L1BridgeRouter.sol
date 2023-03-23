// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @title L1BridgeRouter
 * @author OnGrid Dev Team
 **/
contract L1BridgeRouter is IERC721Receiver {

    IERC721 public token;

    event BridgeToL2(address from, uint256 networkId, uint256 tokenId);

    constructor(IERC721 _token) {
        token = _token;
    }

    /**
     * @dev Withdraws NFT to replicate it on L2 side
     * @param _networkId destination L2 network
     * @param _tokenId token id to bridge
     */
    function bridgeToL2(uint256 _networkId, uint256 _tokenId) public {
        // todo: check if _networkId supported. revert otherwise.
        token.safeTransferFrom(msg.sender, address(this), _tokenId);
        emit BridgeToL2(msg.sender, _networkId, _tokenId);
    }

    /**
     * @dev Returns NFT back when bridging from L2 to L1
     * @param _tokenId token id to unbridge
     * @param _to destination address
     */
    function unbridge(uint256 _tokenId, address _to) public {
        token.safeTransferFrom(address(this), _to, _tokenId);
        // todo: emit event
    }

    function onERC721Received(address, address, uint256, bytes calldata) public override returns (bytes4) {
            return this.onERC721Received.selector;
    }
}
