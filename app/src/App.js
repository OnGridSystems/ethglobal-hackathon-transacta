import TokensList from './components/TokensList';
import useConnection from './hooks/useConnection';
import Header from './components/Header/Header';
import styled from '@emotion/styled';
import Footer from './components/Footer';
import Transactions from './components/Transactions';
import { Routes, Route } from 'react-router-dom';

const Container = styled('div')({
  padding: '40px 120px 240px 120px',
  minHeight: 'calc(100vh - 180px)', // header and footer
  background: 'linear-gradient(328.79deg, #EBECF7 4.16%, #F1F8F7 96.78%)',
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
        <Routes>
          <Route
            path='/'
            element={
              <TokensList
                chainId={chainId}
                switchNetwork={switchNetwork}
                userAddress={userAddress}
              />
            }
          />
          <Route path='/transactions/:page' element={<Transactions />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
