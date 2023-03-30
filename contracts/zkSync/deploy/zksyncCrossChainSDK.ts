import { Wallet, Provider, Contract } from 'zksync-web3';
import { ethers, BigNumber } from 'ethers';
import { config } from 'dotenv';


config();
const txFoo = async () => {
    const TEST_PRIVATE_KEY = process.env.PRIVATE_KEY || '';

    const zkSyncProvider = new Provider('https://zksync2-testnet.zksync.dev');
    const ethereumProvider = ethers.getDefaultProvider(process.env.ETH_URL);
    const wallet = new Wallet(
        TEST_PRIVATE_KEY,
        zkSyncProvider,
        ethereumProvider
    );
    console.log(wallet.address);

    const gasPrice = await wallet.providerL1!.getGasPrice();

    // The calldata can be encoded the same way as for Ethereum
    const contract = new Contract(process.env.ADDRESS_L2 as string, require('../abi.json'), wallet);
    const calldata = contract.interface.encodeFunctionData("setGreeting", ["from Dima"]);
    const estimatedGas = await contract.estimateGas.setGreeting("from Dima");
    const gasLimit = BigNumber.from(estimatedGas);
    const gasPerPubdataByte = BigNumber.from(800);

    const txCostPrice = await wallet.getBaseCost({
        gasPrice,
        gasLimit,
        gasPerPubdataByte,
    });

    console.log(
        `Executing the transaction will cost ${ethers.utils.formatEther(
            txCostPrice
        )} ETH`
    );

    const executeTx = await wallet.requestExecute({
        calldata,
        l2GasLimit: gasLimit,
        gasPerPubdataByte,
        contractAddress: contract.address,
        overrides: {
            gasPrice,
            value: txCostPrice,
        },
    });

    return await executeTx.wait();
};

txFoo().then((r) => console.log(r));
