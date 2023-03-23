import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      display='flex'
      alignItems='center'
      justifyContent='center'
      maxWidth='100vw'
      height='80px'
      bgcolor='white'>
      <img src='img/Ongrid.svg' alt='ongrid'></img>
    </Box>
  );
};

export default Footer;
