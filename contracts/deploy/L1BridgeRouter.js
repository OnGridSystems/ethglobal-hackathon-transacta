module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const tokenAddress = (await deployments.get("L1Token")).address;
  await deploy("L1BridgeRouter", {
    from: deployer,
    args: [tokenAddress],
    log: true,
  });
};
module.exports.tags = ["L1BridgeRouter"];
module.exports.dependencies = ["L1Token"]  
