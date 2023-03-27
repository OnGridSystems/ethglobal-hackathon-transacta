const hre = require("hardhat");
require("dotenv").config();

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const l1ContractAddress = process.env.L1_CONTRACT;
  const l2BridgeAddress = "0xf6beeebb578e214ca9e23b0e9683454ff88ed2a7";

  await deploy("L2Contract", {
    from: deployer,
    args: [l1ContractAddress, l2BridgeAddress],
    log: true,
  });
};
module.exports.tags = ["L2Contract"];
