import TokensList from './components/TokensList';
import useConnection from './hooks/useConnection';
import Header from './components/Header';
import styled from '@emotion/styled';

const Container = styled('div')({
  maxWidth: '1200px',
  margin: '40px auto',
});

function App() {
  const { userAddress, connectWallet, switchNetwork, chainId } =
    useConnection();

  return (
    <div className='App'>
      <Header
        chainId={chainId}
        userAddress={userAddress}
        connectWallet={connectWallet}
        switchNetwork={switchNetwork}
      />
      <Container>
        <TokensList />
      </Container>
    </div>
  );
}

export default App;
