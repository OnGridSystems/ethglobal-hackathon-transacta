import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, Typography } from '@mui/material';
import { MuiTable, TablePaper } from './TransactionsTable.styled';
import { useQuery } from '@apollo/client';
import { TRANSACTION_QUERY } from '../../gql';
import { shortenAddress } from '../../utils';
import LoadMore from '../LoadMore';
import { useState } from 'react';

const TransactionsTable = () => {
  const [skip, setSKip] = useState(0);
  const [showLoadButton, setShowLoadButton] = useState(true);
  const { data, fetchMore } = useQuery(TRANSACTION_QUERY, {
    variables: {
      skip: 0,
    },
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        skip: skip + 10,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        console.log(fetchMoreResult);
        const newTransfers = fetchMoreResult.transfers;
        if (newTransfers.length) {
          setSKip((prev) => prev + 10);
          return {
            transfers: [...previousQueryResult.transfers, ...newTransfers],
          };
        } else {
          setShowLoadButton(false);
          // return previousQueryResult;
        }
      },
    });
  };

  return (
    <>
      <MuiTable component={TablePaper}>
        <Table sx={{ minWidth: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Transaction</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.transfers.map((transfer) => (
              <TableRow key={transfer.transactionHash}>
                <TableCell
                  sx={{ display: 'flex', gap: '20px' }}
                  component='th'
                  scope='row'>
                  <img
                    src='/img/networks/mainnet.svg'
                    width={24}
                    height={24}
                    alt='network'></img>
                  <Typography fontWeight={500}> Goerli</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Link
                    href={`https://goerli.etherscan.io/tx/${transfer.transactionHash}`}
                    target='_blank'
                    rel='noopener'>
                    {shortenAddress(transfer.transactionHash)}
                  </Link>
                </TableCell>
                <TableCell align='right'>
                  {shortenAddress(transfer.from)}
                </TableCell>
                <TableCell align='right'>
                  {shortenAddress(transfer.to)}
                </TableCell>
                <TableCell align='right'>
                  {new Date(
                    transfer.blockTimestamp * 1000
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell align='right'>
                  {new Date(
                    transfer.blockTimestamp * 1000
                  ).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiTable>

      {showLoadButton && <LoadMore onLoadMore={onLoadMore} />}
    </>
  );
};

export default TransactionsTable;
