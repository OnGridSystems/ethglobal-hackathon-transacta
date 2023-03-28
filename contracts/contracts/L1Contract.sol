//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "./IScrollMessenger.sol";

// interface IL2Contract {
//     function setGreeting(string memory _greeting) external;
// }

contract L1Contract {
    address l1Messenger;
    

    constructor(address _l1Messenger) {
      l1Messenger = _l1Messenger;
    }

    function sendMessage(uint256 _tokenId, address _to) payable public {
      // uint256 _gasLimit = 100000;
      // bytes memory _message = abi.encodeWithSelector(
      //   IL2Contract.setGreeting.selector,
      //   _tokenId,
      //   _to
      // );

      IScrollMessenger(l1Messenger).sendMessage{ value: msg.value }(_tokenId, _to); 
    }
}
