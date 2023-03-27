require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("dotenv").config();

const private_key = process.env["PRIVATE_KEY"];
const api_key = process.env["API_KEY"];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/tmn4Rf7lh4ezew016QX0cDPAmAKb2KBz",
      accounts: [private_key],
      chainId: 5,
    },
    zkEVM: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [`0x${private_key}`],
      chainId: 1442,
      verify: {
        etherscan: {
          apiKey: api_key,
          apiURL: "https://explorer.public.zkevm-test.net/api",
        },
      },
    },
  },
  etherscan: {
    apiKey: api_key,
  },
};
