const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const l1Bridge = "0xf6beeebb578e214ca9e23b0e9683454ff88ed2a7";
  const provider = new hre.ethers.providers.StaticJsonRpcProvider(
    hre.network.config.url
  );
  const minimumFeeMethodId = ethers.utils.id("minimumFee()").slice(0, 10);
  const callResult = await provider.call({
    to: l1Bridge,
    data: minimumFeeMethodId,
  });
  const fee = hre.ethers.BigNumber.from(callResult);
  console.log("fee:", hre.ethers.utils.formatEther(fee));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
