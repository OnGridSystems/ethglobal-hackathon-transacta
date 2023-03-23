import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const AppHeader = styled('header')({
  maxWidth: '100vw',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 120px',
  background: 'white',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgb(53, 94, 168)',
});

export const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const ProjectName = styled(Typography)`
  font-size: 22px;
  margin-left: 15px;
  font-weight: 800;
  text-transform: uppercase;
`;
