import { Box } from '@mui/material';
import { MuiButton } from './Web3Status';

const LoadMore = ({ onLoadMore }) => {
  return (
    <Box mt={3} justifyContent='center' width='100%' display='flex'>
      <MuiButton onClick={onLoadMore} size='small' sx={{ height: '24px' }}>
        Load more
      </MuiButton>
    </Box>
  );
};

export default LoadMore;
