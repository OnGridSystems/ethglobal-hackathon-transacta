import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { shortenAddress } from '../utils';

import { networksLogos } from '../constants';
import networks from '../networks.json';
import { MuiButton } from './Web3Status';
import styled from '@emotion/styled';

const CardNetworkIcon = styled(Avatar)`
  position: absolute;
  width: 46px;
  height: 46px;
  right: 20px;
  top: -20px;
`;

const CardText = styled(Typography)`
  font-family: 'Inter';
  font-size: 16px;
  margin: 5px 0;
`;

const TokenCardContent = styled(CardContent)`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

function TokenCard({
  tokenId = 0,
  owner = '0x0000000000000000000000000000000000000000',
  image,
  chainId = 97,
  skill = 0,
  setCurrentItem,
  toggleModal,
  hasButton,
  userAddress
}) {
  return (
    <Card
      sx={{
        borderRadius: '32px',
        width: '276px',
      }}>
      <CardMedia sx={{ height: 296 }} image={image} title='token image' />
      <TokenCardContent
        sx={{
          position: 'relative',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
        }}>
        <CardNetworkIcon
          alt={`${networks[chainId].name} network logo`}
          src={networksLogos[chainId]}
        />
        <CardText
          fontSize='24px !important'
          gutterBottom
          variant='h5'
          component='div'
          fontWeight={600}>
          Cool Token #{tokenId}
        </CardText>
        <Box display='flex' justifyContent='space-between'>
          <CardText variant='body2' color='text.secondary' align='left'>
            Character points:
          </CardText>
          <CardText variant='body2' color='text.primary' align='right'>
            {skill}
          </CardText>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <CardText variant='body2' color='text.secondary' align='left'>
            Owner:
          </CardText>
          <Link
            color='text.primary'
            marginTop='5px'
            href={`${networks[chainId].blockExplorer}address/${owner}`}
            target='_blank'
            rel='noopener'>
            {shortenAddress(owner)}
          </Link>
        </Box>
      </TokenCardContent>
      {hasButton ? (
        <CardActions>
          <MuiButton
            variant='contained'
            sx={{ margin: '25px 18px 32px 18px' }}
            fullWidth
            disabled={userAddress !== owner}
            onClick={userAddress !== owner ? undefined : () => {
              setCurrentItem({
                tokenId,
                owner,
                skill,
                chainId,
                image,
              });
              toggleModal();
            }}>
            BRIDGE
          </MuiButton>
        </CardActions>
      ) : null}
    </Card>
  );
}

TokenCard.Skeleton = () => {
  return (
    <Card sx={{ width: 276, borderRadius: '32px' }}>
      <Skeleton height={276} width='100%' variant='rounded' />
      <TokenCardContent sx={{ position: 'relative' }}>
        <Skeleton
          variant='circular'
          sx={{
            position: 'absolute',
            right: 10,
            top: -20,
          }}
          height={48}
          width={48}
        />
        <CardText
          gutterBottom
          variant='h5'
          component='div'
          align='left'
          maxWidth='170px'>
          <Skeleton />
        </CardText>
        <Box display='flex' justifyContent='space-between'>
          <CardText color='text.secondary' align='left' width='50%'>
            <Skeleton />
          </CardText>
          <CardText
            variant='body2'
            color='text.secondary'
            align='right'
            width='15%'>
            <Skeleton />
          </CardText>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <CardText
            variant='body2'
            color='text.secondary'
            align='left'
            width='20%'>
            <Skeleton />
          </CardText>
          <CardText
            variant='body2'
            color='text.secondary'
            align='right'
            width='40%'>
            <Skeleton />
          </CardText>
        </Box>
      </TokenCardContent>
      <CardActions>
        <Skeleton
          variant='rounded'
          width='100%'
          height='50px'
          sx={{ my: '25px', borderRadius: '50px' }}
        />
      </CardActions>
    </Card>
  );
};

export default TokenCard;
