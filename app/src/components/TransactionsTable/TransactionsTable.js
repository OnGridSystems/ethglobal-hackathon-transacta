import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { MuiTable, TablePaper } from './TransactionsTable.styled';
import TablePagination from '../Pagination';

const TransactionsTable = () => {
  return (
    <>
      <MuiTable component={TablePaper}>
        <Table sx={{ minWidth: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{ display: 'flex', gap: '20px' }}
                component='th'
                scope='row'>
                <img
                  src='/img/networks/mainnet.svg'
                  width={24}
                  height={24}
                  alt='network'></img>
                <Typography fontWeight={500}> Polygon</Typography>
              </TableCell>
              <TableCell align='right'>Cool Token #01</TableCell>
              <TableCell align='right'>0x2472...38B4</TableCell>
              <TableCell align='right'>0x2472...38B4</TableCell>
              <TableCell align='right'>22.03.2023</TableCell>
              <TableCell align='right'>14:35</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                a
              </TableCell>
              <TableCell align='right'>1</TableCell>
              <TableCell align='right'>2</TableCell>
              <TableCell align='right'>3</TableCell>
              <TableCell align='right'>4</TableCell>
              <TableCell align='right'>4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MuiTable>
      <TablePagination />
    </>
  );
};

export default TransactionsTable;
