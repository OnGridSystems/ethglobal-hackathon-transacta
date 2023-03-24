import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TablePagination = () => {
  const { page } = useParams();
  const nabigate = useNavigate();
  const [curPage, setPage] = useState(Number(page));

  const handleChange = (_, page) => {
    setPage(page);
    nabigate(`/transactions/${page}`);
  };

  return (
    <Pagination
      count={10}
      page={curPage}
      onChange={handleChange}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '40px',
        '.Mui-selected': { opacity: 0.75 },
        '.MuiButtonBase-root': { background: 'white' },
      }}
      siblingCount={1}
      boundaryCount={1}
      size='large'
      color='primary'
    />
  );
};

export default TablePagination;
