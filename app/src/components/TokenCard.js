import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton"
import { shortenAddress } from "../utils";

import { networksLogos } from "../constants";
import networks from "../networks.json";

function TokenCard({
  tokenId = 0,
  owner = "0x0000000000000000000000000000000000000000",
  image,
  chainId = 97,
  skill = 0,
  setCurrentItem,
  toggleModal,
  hasButton,
}) {
  return (
    <Card sx={{ width: 250 }}>
      <CardMedia sx={{ height: 200 }} image={image} title="token image" />
      <CardContent sx={{ position: "relative" }}>
        <Avatar
          sx={{
            bgcolor: 'white',
            position: "absolute",
            right: 10,
            top: 0,
          }}
          alt={`${networks[chainId].name} network logo`}
          src={networksLogos[chainId]}
        />
        <Typography gutterBottom variant="h5" component="div" align="left">
          Cool Token #{tokenId}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" align="left">
            Character points:
          </Typography>
          <Typography variant="body2" color="text.secondary" align="right">
            {skill}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" align="left">
            Owner:
          </Typography>
          <Link
            variant="body2"
            color="text.secondary"
            align="right"
            href={`${networks[chainId].blockExplorer}address/${owner}`}
            target="_blank"
            rel="noopener"
          >
            {shortenAddress(owner)}
          </Link>
        </Box>
      </CardContent>
      {hasButton ? (
        <CardActions>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setCurrentItem({
                tokenId,
                owner,
                skill,
                chainId,
                image,
              });
              toggleModal();
            }}
          >
            BRIDGE
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}

TokenCard.Skeleton = () => {
  return (
    <Card sx={{ width: 250 }}>
      <Skeleton height={200} width='100%' variant="rounded" />
      <CardContent sx={{ position: "relative" }}>
        <Skeleton 
          variant="circular" 
          sx={{
            position: "absolute",
            right: 10,
            top: 0,
          }} 
          height={40}
          width={40}
        />
        <Typography gutterBottom variant="h5" component="div" align="left" maxWidth='170px'><Skeleton/></Typography>
        <Box display="flex" justifyContent="space-between" >
          <Typography variant="body2" color="text.secondary" align="left" width='50%'>
            <Skeleton/>
          </Typography>
          <Typography variant="body2" color="text.secondary" align="right" width='15%'>
            <Skeleton/>
          </Typography>
        </Box>
          <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" align="left" width='20%'>
            <Skeleton/>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="right"
            width='40%'
          >
            <Skeleton/>
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Skeleton
          variant="rounded"
          width='100%'
          height='36px'
        />
        </CardActions>
    </Card>
  )
}

export default TokenCard;
