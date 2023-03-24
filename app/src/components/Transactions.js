import { Typography } from '@mui/material';
import TransactionsTable from './TransactionsTable/TransactionsTable';

const Transactions = () => {
  return (
    <>
      <Typography
        variant='h4'
        fontFamily='Inter'
        fontWeight='600'
        margin='50px 0 20px 0'>
        Latest Transactions
      </Typography>
      <TransactionsTable />
    </>
  );
};

export default Transactions;
