import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
} from '@mui/material';
import { Paper, Typography } from '@mui/material';
import TokenCard from './TokenCard';
import ChainCard from './ChainCard';
import { ArrowCircleRightOutlined as ArrowIcon } from '@mui/icons-material';
import { networksLogos } from '../constants';
import networks from '../networks.json';
import { bridgeToken } from '../api';

/**
 * @param {string} fromId Chain Id of current item
 * @param {string} toId Chain Id of selected network
 * @returns if exist, price with format "%price% %ticker%", else null
 */
const getBridgePrice = (fromId, toId) => {
  const price = networks[fromId]?.brigingPrice[toId]?.value;
  const ticker = networks[fromId]?.params?.nativeCurrency?.symbol;
  return price && ticker ? `${price} ${ticker}` : null;
};

const getAvaibleChains = (chainId) => {
  const avaibleChains = networks[chainId]?.brigingPrice;
  return avaibleChains
    ? Object.keys(networks[chainId]?.brigingPrice).map((chain) => ({
        chainId: chain,
        name: networks[chain].name,
      }))
    : [];
};

function BridgeModal({ isOpen, toggle, currentItem, chainId, switchNetwork }) {
  const descriptionElementRef = React.useRef(null);
  const [ currentChain, setCurrentChain ] = React.useState('');
  const [ pending, setPending ] = React.useState(false);
  const [ txStatus, setTxStatus ] = React.useState('');
  const [ txLink, setTxLink ] = React.useState('');
  const [ confirmed, setConfirmed ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState(null);

  const chains = React.useMemo(
    () => getAvaibleChains(currentItem.chainId),
    [currentItem.chainId]
  ); // ref memo

  
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    setCurrentChain(chains[0]?.chainId || '');
  }, [chains]);

  const bridgePrice = getBridgePrice(currentItem.chainId, currentChain);
  const isSameNetwork = currentItem.chainId === Number(chainId);
  const bridge = async () => {
    if (isSameNetwork) {
      // toggle()
      await bridgeToken(
        currentItem.chainId, 
        currentChain, 
        currentItem.tokenId, 
        setPending, 
        setTxStatus, 
        setTxLink, 
        setLoading, 
        setConfirmed,
        setError
      )
      return
    }

    switchNetwork(currentItem.chainId)
  }

  return (
    <BridgeModal.Layout isOpen={isOpen} toggle={toggle}>
      <TokenCard {...currentItem} />
      <DialogContentText
        id='scroll-dialog-description'
        ref={descriptionElementRef}
        tabIndex={-1}>
        <BridgeModal.Body>
          <Typography align='center'>
            The token will be transferred to another network
          </Typography>
          <BridgeModal.FromTo
            from={currentItem.chainId}
            chains={chains}
            currectChainId={currentChain}
            setChain={(e) => setCurrentChain(e.target.value)}
          />
          <Typography align='center'>
            Approve and bridging token to another network. The stages of
            bridging will be shown here.
          </Typography>
          <div>
            <Typography align='center' variant='h4'>
              {bridgePrice}
            </Typography>
            <Typography align='center' variant='body2'>
              Price per translation
            </Typography>
          </div>
          <Typography align='center'>
            The amount payable is estimated. You will pay at least{' '}
            {bridgePrice + ' '}
            or the transaction will be rolled back
          </Typography>
          <Button
            onClick={!pending && !loading && bridge}
            variant='contained'
            fullWidth
            size='large'
            disabled={!bridgePrice || pending || loading}>
            {isSameNetwork ? 'bridge' : 'Switch network'}
          </Button>

          { txStatus && (
            <Box display='flex' flexDirection='column'>
              <Typography>{ pending }</Typography>
              <Typography>{ txStatus }</Typography>
              <Typography>
                <a 
                  href={
                    networks[currentItem.chainId].blockExplorer 
                      + '/tx/' 
                      + txLink
                  } 
                  target='_blank' 
                  rel="noreferrer"
                >
                  link
                </a>
              </Typography>
              <Typography>{ confirmed }</Typography>
              <Typography>{ loading }</Typography>
              { error && <Typography>{ `Some error occured` }</Typography> }
            </Box>
          ) }
        </BridgeModal.Body>
      </DialogContentText>
    </BridgeModal.Layout>
  );
}

BridgeModal.Layout = ({ children, isOpen, toggle }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'>
      <DialogContent>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap='1rem'>
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

BridgeModal.Body = ({ children }) => {
  return (
    <Paper
      sx={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
      {children}
    </Paper>
  );
};

BridgeModal.FromTo = ({ from, currectChainId, setChain, chains }) => {
  return (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <ChainCard chainId={from} />
      <ArrowIcon fontSize='large' />
      <SelectChain
        currectChainId={currectChainId}
        setChain={setChain}
        chains={chains}
      />
    </Box>
  );
};

const SelectChain = ({ currectChainId, setChain, chains }) => {
  return chains.length > 1 ? (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        width: '170px',
      }}>
      <>
        <Avatar src={networksLogos[currectChainId]} />
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Chain</InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={currectChainId}
            label='Chain'
            onChange={setChain}>
            {chains.map((chain) => (
              <MenuItem value={chain.chainId}>{chain.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    </Paper>
  ) : (
    <ChainCard chainId={chains[0].chainId} />
  );
};

export default BridgeModal;
