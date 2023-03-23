import React, { useState } from 'react';
import TokenCard from './TokenCard';
import useModal from '../hooks/useModal';
import BridgeModal from './BridgeModal';
import { Box, Grid } from '@mui/material';
import TokenFilters from './TokenFilters';
import { useTokens } from '../hooks/useTokens';

const onlyMyTokens = (accountId) => (tokens) => {
  const account = accountId.toLowerCase();
  return tokens.filter((token) => token.owner.toLowerCase().includes(account));
};
/*
const tokens = [
  {
    tokenId: 0,
    owner: '0x0000000000000000000000000000000000000000',
    image:
      'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 534353,
    skill: 0,
  },
  {
    tokenId: 5,
    owner: '0x0000000000000000000000000000000000000000',
    image:
      'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 534353,
    skill: 0,
  },
  {
    tokenId: 6,
    owner: '0x0000000000000000000000000000000000000000',
    image:
      'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 534353,
    skill: 0,
  },
  {
    tokenId: 10,
    owner: '0x3A93BF9fCD41564E2213f021eF5A7C03907ECa77',
    image:
      'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 5,
    skill: 0,
  },
  {
    tokenId: 1,
    owner: '0x0000000000000000000000000000000000000000',
    image:
      'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 1442,
    skill: 10,
  },
  {
    tokenId: 2,
    owner: '0x0000000000000000000000000000000000000000',
    image:
      'https://cs12.pikabu.ru/post_img/big/2022/03/02/12/1646253355177860649.jpg',
    chainId: 5,
    skill: 999,
  },
];
*/

function TokensList({ chainId, switchNetwork, userAddress }) {
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
  const { asyncTokens, asyncTokensError, asyncTokensLoading } = useTokens();
  const [filters, setFilters] = React.useState([]);
  const filteredTokens = React.useMemo(() => {
    if (!asyncTokens) return null;
    let res = [...asyncTokens];
    for (const filter of filters) {
      res = filter.fn(res);
    }
    return res;
  }, [filters, asyncTokens]);

  return (
    <Box justifyContent='center'>
      <TokenFilters
        setFilters={setFilters}
        onlyMyTokens={onlyMyTokens}
        userAddress={userAddress}
      />
      <Grid
        container
        sx={{
          display: 'grid',
          marginLeft: 0,
          gridTemplateColumns: 'repeat(auto-fill,minmax(276px,1fr))',
          gap: '20px',
        }}>
        {asyncTokensLoading &&
          Array.from({ length: 8 }, (_, idx) => (
            <Grid item key={idx}>
              <TokenCard.Skeleton key={idx} />
            </Grid>
          ))}
        {filteredTokens &&
          filteredTokens.map(
            ({
              token_id,
              owner,
              image,
              chain_id,
              skill,
              json_metadata /* @TODO: add metadata handling */,
            }) => (
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
            )
          )}
        <BridgeModal
          isOpen={isOpen}
          toggle={toggle}
          currentItem={currentItem}
          chainId={chainId}
          switchNetwork={switchNetwork}
        />
      </Grid>
    </Box>
  );
}

export default TokensList;
