module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy('L2Contract', {
    from: deployer,
    args: ['0x24F05AAc6837727012226B5c0Bf87BdeF3ae97A4','0xb75d7e84517e1504C151B270255B087Fd746D34C'],
    log: true,
  });
};
module.exports.tags = ['L2Contract'];
