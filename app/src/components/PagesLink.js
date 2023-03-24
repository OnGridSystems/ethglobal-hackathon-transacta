import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PageLink = styled(Link)`
  text-decoration: none;
  color: #68a8ff;
  height: 100%;
  padding-top: 40px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  &:hover {
    border-bottom: 4px solid #68A8FF;
  }
`;

const PagesLink = () => {
  return (
    <Box gap='40px' display='flex' height='100%' alignItems='center'>
      <PageLink to='/'>Marketplace</PageLink>
      <PageLink to='/transactions/1'>Transactions</PageLink>
    </Box>
  );
};

export default PagesLink;
