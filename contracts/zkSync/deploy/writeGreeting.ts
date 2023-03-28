import { config } from 'dotenv';
import { Wallet, Contract, Provider } from 'zksync-web3';
const abi = require('../abi.json')
config();

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
if (!PRIVATE_KEY) {
    throw new Error('Please set PRIVATE_KEY in the environment variables.');
}
const main = async () => {  
    console.log(`Running setGreeting`);
    const providerL1 = new Provider(process.env.ETH_URL);
    const providerL2 = new Provider(process.env.ZKSYNC_URL);
    const wallet = new Wallet(PRIVATE_KEY, providerL2, providerL1);
    const contract = new Contract(process.env.ADDRESS as string, abi, wallet);
    const tx = await contract.setGreeting("Set Greeting...");
    const receipt = await tx.wait();
    if (receipt.status !== 0) {
        console.log("Successfully changed");
    }
}

main().catch(console.error);
