module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const tokenAddress = (await deployments.get("L2TokenMinter")).address;
    await deploy("L2Token", {
      from: deployer,
      args: [tokenAddress],
      log: true,
    });
  };
module.exports.tags = ["L2Token"];
module.exports.dependencies = ["L2TokenMinter"]  