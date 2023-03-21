import React, { useState } from 'react';
import TokenCard from './TokenCard';
import useModal from '../hooks/useModal';
import BridgeModal from './BridgeModal';
import { Box, FormControlLabel, Grid, Stack, Switch } from '@mui/material';
import useConnection from '../hooks/useConnection';
import { useQuery } from '@tanstack/react-query';
import { getTokens } from '../api'

const onlyMyTokens = (accountId) => (tokens) => {
  const account = accountId.toLowerCase()
  return tokens.filter((token) => token.owner.toLowerCase().includes(account))
}
/*
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
*/

const useTokens = () => {
  // const [tokensList, setTokensList] = React.useState(tokens)
  const { data, error, isLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: getTokens,

  })
  return {
    // tokensList, 
    // setTokensList,
    asyncTokens: data,
    asyncTokensError: error,
    asyncTokensLoading: isLoading
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
  // @todo: add error handling of loading
  const { asyncTokens, asyncTokensError, asyncTokensLoading } = useTokens()
  const [filters, setFilters] = React.useState([])
  const filteredTokens = React.useMemo(() => {
    if (!asyncTokens) return null
    let res = [...asyncTokens]
    for (const filter of filters) {
      res = filter.fn(res)
    }
    return res
  }, [filters, asyncTokens])

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
          { asyncTokensLoading && 
            Array.from({length: 8}, (_, idx) => (
              <Grid item key={idx}>
                <TokenCard.Skeleton key={idx}/>
              </Grid>
          ))}
          { filteredTokens && 
            filteredTokens.map(({ token_id, owner, image, chain_id, skill, json_metadata /* @TODO: add metadata handling */ }) => (
              <Grid item key={token_id}>
                <TokenCard
                  key={token_id}
                  tokenId={token_id}
                  owner={owner}
                  image={image}
                  chainId={chain_id}
                  skill={skill}
                  setCurrentItem={setCurrentItem}
                  toggleModal={toggle}
                  hasButton
                />
              </Grid>
          ))}
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
