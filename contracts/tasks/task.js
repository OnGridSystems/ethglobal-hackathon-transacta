const { task } = require('hardhat/config');
const a = require('../deployments/goerli/L1Contract.json');

task('send', 'outbound transfer from polygon chain').setAction(
  async (_, hre) => {
    const ethers = hre.ethers;
    const provider = new ethers.getDefaultProvider();
    const signer = new ethers.providers.getSigner();
    const L1Contract = await ethers.getContractFactory('L1Contract');
    const L1 = await L1Contract.deploy();
    const L2Contract = await ethers.getContractFactory('L2Contract');
    // const Contract = new ethers.Contract(
    //   '0x868eE273d7900BE8D2d225AB3c090AA12D7Dc691',
    //   a
    // );
    const L2 = await L2Contract.deploy();
    const { deployer } = await getNamedAccounts();

    console.log('send message');
    console.log(
      provider
      // await (await L1.sendMessage(0)).wait()
      // await (
      //   await L2.receiveMessage(0, '0xb75d7e84517e1504C151B270255B087Fd746D34C')
      // ).wait()
    );

    // console.log('receive message');
    // console.log(await (await L2Scroll.receiveMessage()).wait());
  }
);
