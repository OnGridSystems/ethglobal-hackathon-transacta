import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";
import { networksLogos } from "../constants";
import networks from "../networks.json";

function ChainCard({ chainId }) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        width: "170px",
      }}
    >
      <Avatar src={networksLogos[chainId]} />
      <Typography>{networks[chainId].longName}</Typography>
    </Paper>
  );
}

export default ChainCard;
