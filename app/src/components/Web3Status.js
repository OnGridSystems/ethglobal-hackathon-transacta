import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shortenAddress } from '../utils';

const Status = styled('div')(({ theme }) =>
  theme.unstable_sx({
    borderRadius: '8px',
    bgcolor: 'primary.main',
    width: 'max-content',
    padding: '12px 15px',
    color: 'white',
    margin: 0,
    height: '50px',
    display: 'flex',
    alignItems: 'center',
  })
);

const MuiButton = styled(Button)({
  borderRadius: '15px',
  padding: '10px 15px',
  fontWeight: '600',
});

const Web3Status = ({ userAddress, connectWallet }) => {
  return userAddress ? (
    <Status>
      <p>{shortenAddress(userAddress)}</p>
    </Status>
  ) : (
    <MuiButton
      sx={{ width: 'max-content' }}
      variant='contained'
      onClick={connectWallet}>
      connect Wallet
    </MuiButton>
  );
};

export default Web3Status;
