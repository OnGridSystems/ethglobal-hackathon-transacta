//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

interface IScrollMessenger {
  /**********
   * Events *
   **********/

  /// @notice Emitted when a cross domain message is sent.
  event SentMessage(
    uint256 tokenId,
    address to
  );

  /// @notice Return the sender of a cross domain message.
  function xDomainMessageSender() external view returns (address);

  /****************************
   * Public Mutated Functions *
   ****************************/

  /// @notice Send cross chain message from L1 to L2 or L2 to L1.
  function sendMessage(
    uint256 tokenId,
    address to

  ) external payable;
}