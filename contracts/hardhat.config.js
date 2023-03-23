/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0,
  },
  networks: {
    hardhat: {
      
    },
    goerli: { 
      url: "https://eth-goerli.g.alchemy.com/v2/tmn4Rf7lh4ezew016QX0cDPAmAKb2KBz",
      accounts: [process.env.PRIVATE_KEY.toString()],
      chainId: 5
      },
    },
    etherscan: {
      apiKey: "PB2IP5B45PHY3ZT7CZ2MGFDEFMIFGHAZ4I"
    }
  }
};
