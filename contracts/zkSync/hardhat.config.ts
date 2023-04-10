import '@matterlabs/hardhat-zksync-deploy';
import '@matterlabs/hardhat-zksync-solc';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@matterlabs/hardhat-zksync-verify';
import 'hardhat-deploy'
import { config } from 'dotenv';
config();

module.exports = {
    zksolc: {
        version: '1.3.8',
        compilerSource: 'binary',
        settings: {},
    },
    defaultNetwork: 'zkSyncTestnet',
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    networks: {
        zkSyncTestnet: {
            url: 'https://zksync2-testnet.zksync.dev',
            ethNetwork: process.env.ETH_URL, // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
            zksync: true,
            accounts: [process.env.PRIVATE_KEY],
            verifyURL: 'https://goerli.explorer.zksync.io/contracts/verify',
        },
        goerli: {
            url: process.env.ETH_URL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 5,
        },
        
    },
    etherscan: {
        apiKey: `${process.env.API_KEY}`
    },
    solidity: {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
    },
};
