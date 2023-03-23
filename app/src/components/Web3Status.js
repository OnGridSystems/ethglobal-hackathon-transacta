import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shortenAddress } from '../utils';

const Status = styled('div')(({ theme }) =>
  theme.unstable_sx({
    padding: '15px 25px',
    fontWeight: '400',
    height: '42px',
    border: '1px solid #54C3FF',
    borderRadius: ' 50px',
    display: 'flex',
    alignItems: 'center',
  })
);

export const MuiButton = styled(Button)({
  padding: '15px 25px',
  fontWeight: '500',
  transition: 'none',
  fontFamily: 'Inter',
  height: '52px',
  background: 'transparent',
  borderRadius: ' 50px',
  color: 'black',
  boxShadow: 'none',
  border: '1px solid rgb(113, 156, 255)',
  '&: hover': {
    color: 'white',
    border: 'none',
    boxShadow: 'none',
    background: 'linear-gradient(190.11deg, #54C3FF 21.17%, #A453FF 184.05%)',
  },
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
