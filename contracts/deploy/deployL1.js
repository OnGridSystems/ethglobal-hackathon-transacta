const hre = require("hardhat");
require("dotenv").config();

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const l1BridgeAddress = "0xf6beeebb578e214ca9e23b0e9683454ff88ed2a7";

  await deploy("L1Contract", {
    from: deployer,
    args: [l1BridgeAddress],
    log: true,
  });
};
module.exports.tags = ["L1Contract"];
