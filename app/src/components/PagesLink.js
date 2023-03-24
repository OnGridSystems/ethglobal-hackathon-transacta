import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

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
    border-bottom: 4px solid #68a8ff;
  }
`;

const PagesLink = () => {
  const { pathname } = useLocation();
  return (
    <Box gap='40px' display='flex' height='100%' alignItems='center'>
      <PageLink
        to='/'
        style={{ borderBottom: pathname === '/' ? ' 4px solid #68a8ff' : '' }}>
        Marketplace
      </PageLink>
      <PageLink
        to='/transactions'
        style={{
          borderBottom: pathname === 'transactions' ? ' 4px solid #68a8ff' : '',
        }}>
        Transactions
      </PageLink>
    </Box>
  );
};

export default PagesLink;
