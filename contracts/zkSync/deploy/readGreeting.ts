import { config } from 'dotenv';
import { Wallet, Contract, Provider } from 'zksync-web3';
const abi = require('../abi.json')
config();

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
if (!PRIVATE_KEY) {
    throw new Error('Please set PRIVATE_KEY in the environment variables.');
}

const read = async () => {
    console.log(`Running get greet`);
    const providerL1 = new Provider(process.env.ETH_URL);
    const providerL2 = new Provider(process.env.ZKSYNC_URL);
    const wallet = new Wallet(PRIVATE_KEY, providerL2, providerL1);
    const contract = new Contract(process.env.ADDRESS as string, abi, wallet);
    const greet = await contract.greet()
    console.log(greet);
}

read().catch(err => console.error(err))