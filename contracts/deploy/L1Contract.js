module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy('L1Contract', {
    from: deployer,
    args: ['0x5260e38080BFe97e6C4925d9209eCc5f964373b6'],
    log: true,
  });
};
module.exports.tags = ['L1Contract'];
