module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy("L2TokenMinter", {
      from: deployer,
      args: [],
      log: true,
    });
  };
  module.exports.tags = ["L2TokenMinter"];
