import styled from '@emotion/styled';
import { Box, Switch, Typography } from '@mui/material';
import { useState } from 'react';

const FilterSwitch = styled(Switch)`
  width: 52px;
  height: 32px;
  padding: 1px;
  .MuiButtonBase-root {
    padding: 4px;
    height: 100%;
    transition-duration: 400ms;
    &:hover {
      background: none;
    }
  }
  .MuiSwitch-thumb {
    height: 24px;
    width: 24px;
    box-shadow: none;
  }
  .Mui-checked {
    opacity: 0.6;
  }
  .MuiSwitch-track {
    background: none;
    background: linear-gradient(190.11deg, #54c3ff 21.17%, #a453ff 184.05%);
    opacity: 0.2;
    border-radius: 50px;
  }
`;

const TokenFilters = ({ setFilters, onlyMyTokens, userAddress }) => {
  const [toggleOnlyMy, setToggleOnlyMy] = useState(false);
  const changeOnlyMy = () => {
    setToggleOnlyMy((prev) => !prev);
    setFilters((prev) =>
      !toggleOnlyMy
        ? [
            ...prev,
            {
              id: 'only-my-tokens',
              fn: onlyMyTokens(userAddress),
            },
          ]
        : prev.filter((filter) => filter.id !== 'only-my-tokens')
    );
  };

  return (
    <Box display='flex' gap='10px' alignItems='center' my='40px'>
      <Typography variant='h4' fontFamily='Inter' fontWeight='600'>
        Show only my tokens
      </Typography>
      <FilterSwitch onChange={changeOnlyMy} checked={toggleOnlyMy} />
    </Box>
  );
};

export default TokenFilters;
