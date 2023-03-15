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
import { deepOrange } from "@mui/material/colors";
import { shortenAddress } from "../utils";

const networksLogos = {
  42: "/img/networks/mainnet.svg",
  97: "/img/networks/BSC.svg",
  80001: "/img/networks/polygon.svg",
};

function TokenCard({
  tokenId = 0,
  owner = "0x0000000000000000000000000000000000000000",
  image,
  chainId = 97,
  skill = 0,
}) {
  return (
    <Card sx={{ width: 250 }}>
      <CardMedia sx={{ height: 200 }} image={image} title="green iguana" />
      <CardContent sx={{ position: "relative" }}>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            position: "absolute",
            right: 10,
            top: 0,
          }}
          alt="network logo"
          src={networksLogos[chainId]}
        >
          BS
        </Avatar>
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
            href={`https://testnet.bscscan.com/address/${owner}`}
            target="_blank"
            rel="noopener"
          >
            {shortenAddress(owner)}
          </Link>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth>
          BRIDGE
        </Button>
      </CardActions>
    </Card>
  );
}

export default TokenCard;
