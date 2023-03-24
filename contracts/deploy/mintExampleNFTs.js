module.exports = async ({deployments}) => {
    const hre = require("hardhat")
    const ethers = hre.ethers;
    const Contract = await ethers.getContractFactory(deployments.get("ExampleNFT").address);
    const contract = Contract.attach(deployments.get("ExampleNFT").address);
    for(var i = 1; i <= 10; i++) {
        contract.mint.call(process.env.DEPLOYER_WALLET);
    }
}
module.exports.tags = ['mintExampleNFTs'];
//module.exports.dependencies = ['ExampleNFT'];