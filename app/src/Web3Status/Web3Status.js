import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shortenAddress } from '../utils';

const Status = styled('p')(({ theme }) =>
  theme.unstable_sx({
    borderRadius: '7px',
    bgcolor: 'primary.main',
    width: 'max-content',
    padding: '10px',
    color: 'white',
    margin: 0,
  })
);

const Web3Status = ({ userAddress, connectWallet }) => {
  return userAddress ? (
    <Status>{shortenAddress(userAddress)}</Status>
  ) : (
    <Button variant='contained' onClick={connectWallet}>
      connect Wallet
    </Button>
  );
};

export default Web3Status;
