import React, { useState } from 'react';
import TokenCard from './TokenCard';
import useModal from '../hooks/useModal';
import BridgeModal from './BridgeModal';
import { Box, FormControlLabel, Grid, Stack, Switch } from '@mui/material';
import useConnection from '../hooks/useConnection';

const onlyMyTokens = (accountId) => (tokens) => {
  const account = accountId.toLowerCase()
  return tokens.filter((token) => token.owner.toLowerCase().includes(account))
}
const tokens = [
  {
    tokenId: 0,
    owner: '0x0000000000000000000000000000000000000000',
    image: 'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 534353,
    skill: 0,
  },
  {
    tokenId: 5,
    owner: '0x0000000000000000000000000000000000000000',
    image: 'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 534353,
    skill: 0,
  },
  {
    tokenId: 6,
    owner: '0x0000000000000000000000000000000000000000',
    image: 'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 534353,
    skill: 0,
  },
  {
    tokenId: 10,
    owner: '0x3A93BF9fCD41564E2213f021eF5A7C03907ECa77',
    image: 'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 5,
    skill: 0,
  },
  {
    tokenId: 1,
    owner: '0x0000000000000000000000000000000000000000',
    image: 'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 1442,
    skill: 10,
  },
  {
    tokenId: 2,
    owner: '0x0000000000000000000000000000000000000000',
    image: 'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 5,
    skill: 999,
  },
];

const useTokens = () => {
  const [tokensList, setTokensList] = React.useState(tokens)
  return {
    tokensList, 
    setTokensList,
  }
}

const Filters = ({ setFilters }) => {
  const [toggleOnlyMy, setToggleOnlyMy] = React.useState(false)
  const connection = useConnection()
  const changeOnlyMy = () => {
    setToggleOnlyMy(prev => !prev)
    setFilters(
      prev => !toggleOnlyMy 
            ? [...prev, {
                id: 'only-my-tokens', 
                fn: onlyMyTokens(connection.userAddress)
              }] 
            : prev.filter(filter => filter.id !== 'only-my-tokens')
    )
  }

  return (
    <Stack direction='row' mb={1} >
      <FormControlLabel 
        control={
          <Switch 
            onChange={changeOnlyMy} 
            checked={toggleOnlyMy} 
          />
        } 
        label={'Show only my tokens'}
      />
    </Stack>
  )
}

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
  const { tokensList } = useTokens()
  const [filters, setFilters] = React.useState([])
  const filteredTokens = React.useMemo(() => {
    let res = [...tokensList]
    for (const filter of filters) {
      res = filter.fn(res)
    }
    return res
  }, [filters, tokensList])

  return (
    <Box justifyContent='center'>
      <Filters setFilters={setFilters}/>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'grid',
          marginLeft: 0,
          gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
        }}>
        {filteredTokens &&
          filteredTokens.map(({ tokenId, owner, image, chainId, skill }) => {
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
