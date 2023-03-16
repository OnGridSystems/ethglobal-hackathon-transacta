const { ethers } = require("hardhat");

const main = async () =>  {
    const contract = await ethers.getContractAt("L1Token", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    const name = await contract.totalSupply();
    console.log(name);
}

main().catch(console.error);
