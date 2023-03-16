import { styled } from '@mui/material/styles';
import Web3Status from './Web3Status';
import NetworkSelect from './NetworkSelect';

const AppHeader = styled('header')({
  maxWidth: '100vw',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 40px',
  justifyContent: 'space-between',
  borderBottom: '1px solid #9c9c9c',
});

const Header = ({ userAddress, connectWallet, switchNetwork, chainId }) => {
  const changeNetwork = (e) => {
    switchNetwork(+e.target.value);
  };

  return (
    <AppHeader>
      <h2>Hachkathon</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {!!chainId && (
          <NetworkSelect chainId={chainId} changeNetwork={changeNetwork} />
        )}
        <Web3Status userAddress={userAddress} connectWallet={connectWallet} />
      </div>
    </AppHeader>
  );
};

export default Header;
