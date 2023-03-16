import TokensList from "./components/TokensList";
import Web3Status from './Web3Status/Web3Status';
import useConnection from './hooks/useConnection';

function App() {
  const { userAddress, connectWallet } = useConnection();

  return (
    <div className='App'>
      <Web3Status userAddress={userAddress} connectWallet={connectWallet} />
      <TokensList />

    </div>
  );
}

export default App;
