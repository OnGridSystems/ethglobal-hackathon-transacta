import { getAddress } from 'ethers';
import { useState, useEffect } from 'react';
import networks from '../networks.json';

const useConnection = () => {
  const [userAddress, setUserAddress] = useState('');
  const [chainId, setChainId] = useState('');

  function getChain() {
    window.ethereum
      .request({ method: 'eth_chainId' })
      .then((chain) => setChainId(parseInt(chain, 16).toString()))
      .catch((e) => console.log(e));
  }

  async function getUserAddress() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        setUserAddress(getAddress(account));
      }
    }
  }

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setUserAddress(getAddress(accounts[0]));
  }

  async function switchNetwork(chainIdConnect) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networks[chainIdConnect].params.chainId }],
      });
      return true;
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networks[chainIdConnect].params],
          });
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      } else {
        console.error(error);
        return false;
      }
    }
  }

  useEffect(() => {
    getUserAddress();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', getUserAddress);
      window.ethereum.on('chainChanged', getChain);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', getUserAddress);
        window.ethereum.removeListener('chainChanged', getChain);
      }
    };
  }, []);

  useEffect(() => {
    if (userAddress) {
      getChain();
    }
  }, [userAddress]);

  return {
    userAddress,
    chainId,
    getChain,
    getUserAddress,
    connectWallet,
    switchNetwork,
  };
};

export default useConnection;
