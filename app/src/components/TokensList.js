import React, { useState } from 'react';
import TokenCard from './TokenCard';
import useModal from '../hooks/useModal';
import BridgeModal from './BridgeModal';
import { Box, Grid } from '@mui/material';

function TokensList() {
  const [currentItem, setCurrentItem] = useState({
    change: true,
    owner: '0x5fCb8f7149E8aD03544157C90E6f81b26933d3a2',
    skill: 0,
    tokenId: 0,
    tokensChainId: 97,
    image: '',
  });
  const { isOpen, toggle } = useModal();
  const tokens = [
    {
      tokenId: 0,
      owner: '0x0000000000000000000000000000000000000000',
      image: '',
      chainId: 97,
      skill: 0,
    },
    {
      tokenId: 5,
      owner: '0x0000000000000000000000000000000000000000',
      image: '',
      chainId: 97,
      skill: 0,
    },
    {
      tokenId: 6,
      owner: '0x0000000000000000000000000000000000000000',
      image: '',
      chainId: 97,
      skill: 0,
    },
    {
      tokenId: 1,
      owner: '0x0000000000000000000000000000000000000000',
      image: '',
      chainId: 80001,
      skill: 10,
    },
    {
      tokenId: 2,
      owner: '0x0000000000000000000000000000000000000000',
      image: '',
      chainId: 42,
      skill: 999,
    },
  ];

  return (
    <Box justifyContent='center'>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'grid',
          marginLeft: 0,
          gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
        }}>
        {tokens &&
          tokens.map(({ tokenId, owner, image, chainId, skill }) => {
            return (
              <Grid item key={tokenId}>
                <TokenCard
                  key={tokenId}
                  tokenId={tokenId}
                  owner={owner}
                  image={image}
                  chainId={chainId}
                  skill={skill}
                  setCurrentItem={setCurrentItem}
                  toggleModal={toggle}
                  hasButton
                />
              </Grid>
            );
          })}
        <BridgeModal
          isOpen={isOpen}
          toggle={toggle}
          currentItem={currentItem}
        />
      </Grid>
    </Box>
  );
}

export default TokensList;
