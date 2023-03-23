require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
      goerli: { 
        url: "https://eth-goerli.g.alchemy.com/v2/tmn4Rf7lh4ezew016QX0cDPAmAKb2KBz",
        accounts: [process.env.PRIVATE_KEY.toString()],
        chainId: 5
        },
      },
      etherscan: {
        apiKey: `${process.env.API_KEY.toString()}`
      }
    };
