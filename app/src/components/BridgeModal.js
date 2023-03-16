import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper, Typography } from "@mui/material";
import TokenCard from "./TokenCard";
import ChainCard from "./ChainCard";
import { ArrowCircleRightOutlined as ArrowIcon } from "@mui/icons-material";
import networks from "../networks.json";

function BridgeModal({ isOpen, toggle, currentItem }) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <TokenCard
            tokenId={currentItem.tokenId}
            owner={currentItem.owner}
            skill={currentItem.skill}
            chainId={currentItem.chainId}
            image={currentItem.image}
          />
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Paper
              sx={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography align="center">
                The token will be transferred to another network
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <ChainCard chainId={currentItem.chainId} />
                <ArrowIcon fontSize="large" />
                <ChainCard chainId="97" />
              </Box>
              <Typography align="center">
                Approve and bridging token to another network. The stages of
                bridging will be shown here.
              </Typography>
              <div>
                <Typography align="center" variant="h4">
                  0.03 BNB
                </Typography>
                <Typography align="center" variant="body2">
                  Price per translation
                </Typography>
              </div>
              <Typography align="center">
                The amount payable is estimated. You will pay at least 0.03 BNB
                or the transaction will be rolled back
              </Typography>
              <Button
                onClick={toggle}
                variant="contained"
                fullWidth
                size="large"
              >
                Switch network
              </Button>
            </Paper>
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default BridgeModal;
