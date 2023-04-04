module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("L1Token", {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ["L1Token"];
