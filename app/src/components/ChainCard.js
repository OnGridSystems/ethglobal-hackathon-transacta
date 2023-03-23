import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { networksLogos } from '../constants';
import networks from '../networks.json';

function ChainCard({ chainId, direction }) {
  return (
    <Box>
      {direction ? (
        <Typography
          align='left'
          fontWeight='400'
          fontSize='12px'
          lineHeight='15px'
          mb='4px'
        >
          {direction}
        </Typography>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px',
          width: '343px',
          borderRadius: '50px',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          height: '68px',
        }}
      >
        <Avatar sx={{ width: 48, height: 48 }} src={networksLogos[chainId]} />
        <Typography
          fontWeight='600'
          fontSize='16px'
          lineHeight='140%'
          color='rgba(27, 28, 30, 1)'
          mt='4px'
        >
          {networks[chainId].longName}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChainCard;
