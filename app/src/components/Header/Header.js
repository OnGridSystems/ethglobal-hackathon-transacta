import Web3Status from '../Web3Status';
import NetworkSelect from '../NetworkSelect';
import { AppHeader, LogoContainer, ProjectName } from './Header.styled';
import { Box } from '@mui/material';
import PagesLink from '../PagesLink';

const Header = ({ userAddress, connectWallet, switchNetwork, chainId }) => {
  const changeNetwork = (e) => {
    switchNetwork(+e.target.value);
  };

  return (
    <AppHeader>
      <LogoContainer>
        <img
          alt='transacta'
          src='/img/Logo_Transacta.svg'
          style={{ width: '44px' }}
        />
        <ProjectName variant='h1' component='h2'>
          Transacta
        </ProjectName>
      </LogoContainer>
      <PagesLink />
      <Box display='flex' gap='20px' alignItems='center'>
        {!!chainId && (
          <NetworkSelect chainId={chainId} changeNetwork={changeNetwork} />
        )}
        <Web3Status userAddress={userAddress} connectWallet={connectWallet} />
      </Box>
    </AppHeader>
  );
};

export default Header;
