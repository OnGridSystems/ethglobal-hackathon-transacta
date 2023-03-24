module.exports = async ({deployments}) => {
    const hre = require("hardhat")
    const ethers = hre.ethers;
    const address = (await deployments.get("ExampleNFT")).address;
    const Contract = await ethers.getContractFactory("ExampleNFT");
    const contract = Contract.attach(address);
    for(var i = 1; i <= 1; i++) {
        console.log(await contract.mint(process.env.DEPLOYER_WALLET));
    }
}
module.exports.tags = ['mintExampleNFTs'];
module.exports.dependencies = ['ExampleNFT']