import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
  FormControl,
  MenuItem,
  Select,
  Avatar,
  DialogTitle,
  IconButton,
  Divider,
  Link,
} from '@mui/material';
import { Typography } from '@mui/material';
import TokenCard from './TokenCard';
import ChainCard from './ChainCard';
import { Close as CloseIcon, South as ArrowIcon } from '@mui/icons-material';
import { networksLogos } from '../constants';
import networks from '../networks.json';
import { styled } from '@mui/material/styles';
import { bridgeToken } from '../api';
import { shortenAddress } from '../utils';

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

function BridgeModal({ isOpen, toggle, currentItem, chainId, switchNetwork, userAddress }) {
  const descriptionElementRef = React.useRef(null);
  const [currentChain, setCurrentChain] = React.useState('');
  const [pending, setPending] = React.useState(false);
  const [txStatus, setTxStatus] = React.useState('');
  const [txLink, setTxLink] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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
  const bridge = userAddress === currentItem.owner ? async () => {
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
      );
      return;
    }

    switchNetwork(currentItem.chainId);
  } : undefined;

  return (
    <BridgeModal.Layout isOpen={isOpen} toggle={toggle}>
      <Box padding='40px'>
        <TokenCard {...currentItem} />
      </Box>
      <Divider variant='middle' orientation='vertical' flexItem />
      <DialogContentText
        id='scroll-dialog-description'
        ref={descriptionElementRef}
        tabIndex={-1}
      >
        <BridgeModal.Body>
          <Typography
            align='left'
            fontWeight='600'
            fontSize='16px'
            lineHeight='140%'
            color='rgba(27, 28, 30, 1)'
          >
            The token will be transferred to another network
          </Typography>
          <BridgeModal.FromTo
            from={currentItem.chainId}
            chains={chains}
            currectChainId={currentChain}
            setChain={(e) => setCurrentChain(e.target.value)}
          />
          { txStatus 
          ? <TxStatus txStatus={txStatus} txLink={txLink} txError={error} fromChainId={currentItem.chainId}/>
          : <Info bridgePrice={bridgePrice}/> }
          <MuiButton
            onClick={bridge}
            variant='contained'
            fullWidth
            size='large'
            disabled={!bridgePrice || pending || loading || userAddress !== currentItem.owner}
          >
            {isSameNetwork ? 'bridge' : 'Switch network'}
          </MuiButton>
        </BridgeModal.Body>
      </DialogContentText>
    </BridgeModal.Layout>
  );
}


const TxStatus = ({txStatus, txLink, txError, fromChainId }) => {
  return (
    <Box display='flex' flexDirection='column' mt='5px'>
      <Typography variant='subtitle1' fontWeight={500}>
        Status:{` `}
        <Typography 
          component='span' 
          color={txStatus.type === 'success' ? '#28a745' : txStatus.type === 'pending' ? '#ffc107' : '#dc3545'}
          fontWeight={700}
        >
          {txStatus.text}
        </Typography>
        
      </Typography>
      <Typography variant='body1'>
        Transaction hash:{' '}
        <Link 
          href={`${networks[fromChainId].blockExplorer}/tx/${txLink}`} 
          target='_blank' 
          fontSize={'14px'}
        >
          {shortenAddress(txLink)}
        </Link>
      </Typography>
    </Box>
  )
}

const Info = ({bridgePrice}) => {
  return (
    <>
      <Typography
        align='left'
        fontWeight='400'
        fontSize='12px'
        lineHeight='140%'
        color='rgba(27, 28, 30, 1)'
      >
        The stages of bridging will be shown here.
      </Typography>
      <BridgePrice bridgePrice={bridgePrice} />
          <Typography
            align='left'
            fontWeight='400'
            fontSize='12px'
            lineHeight='140%'
            color='rgba(27, 28, 30, 1)'
          >
            The amount payable is estimated. You will pay at least{' '}
            {bridgePrice + ' '}
            or the transaction will be rolled back
          </Typography>
    </>
  )
}

BridgeModal.Layout = ({ children, isOpen, toggle }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      scroll='body'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      maxWidth='md'
      PaperProps={{
        style: { borderRadius: 32 },
      }}
    >
      <Title onClose={toggle} />
      <DialogContent dividers>
        <Box display='flex' flexDirection='row' alignItems='center' gap='1rem'>
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

BridgeModal.Body = ({ children }) => {
  return (
    <Box
      sx={{
        padding: '40px',
        width: 'calc(343px + 80px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {children}
    </Box>
  );
};

BridgeModal.FromTo = ({ from, currectChainId, setChain, chains }) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
      <ChainCard chainId={from} direction='From' />
      <ArrowIcon sx={{ fontSize: '22px', color: 'rgba(0, 0, 0, 0.25)' }} />
      <SelectChain
        currectChainId={currectChainId}
        setChain={setChain}
        chains={chains}
      />
    </Box>
  );
};

function Title(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      {...other}
      sx={{
        height: 67,
        fontSize: 22,
        color: 'rgba(11, 14, 21, 1)',
        fontWeight: 600,
        paddingTop: '18px',
        paddingLeft: '41px',
      }}
    >
      Bridge token
      <IconButton
        aria-label='close'
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 40,
          top: 12,
          color: 'black',
        }}
      >
        <CloseIcon sx={{ fontSize: 28 }} />
      </IconButton>
    </DialogTitle>
  );
}

const MuiButton = styled(Button)({
  padding: '15px 25px',
  fontWeight: '500',
  transition: 'none',
  fontFamily: 'Inter',
  height: '52px',
  borderRadius: ' 50px',
  color: 'white',
  border: 'none',
  boxShadow: 'none',
  background: 'linear-gradient(190.11deg, #54C3FF 21.17%, #A453FF 184.05%)',
  '&: hover': {
    background: 'linear-gradient(10.11deg, #54C3FF 21.17%, #A453FF 184.05%)',
    boxShadow: 'none',
  },
});

const BridgePrice = ({ bridgePrice }) => {
  return (
    <Box
      sx={{
        background: 'rgba(221, 221, 221, 0.2)',
        borderRadius: '32px',
        maxWidth: '343px',
        padding: '23px',
      }}
    >
      <Typography
        align='center'
        color='rgba(27, 28, 30, 1)'
        fontSize='32px'
        fontWeight='600'
        lineHeight='32px'
        mt='6px'
      >
        {bridgePrice}
      </Typography>
      <Typography
        align='center'
        variant='body2'
        fontSize='12px'
        fontWeight='400'
        color='rgba(27, 28, 30, 0.4)'
      >
        Price per translation
      </Typography>
    </Box>
  );
};

const MuiSelect = styled(Select)({
  fontWeight: '500',
  fontFamily: 'Inter',

  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px',
  width: '343px',
  borderRadius: '50px',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  height: '68px',

  '.MuiOutlinedInput-notchedOutline': { border: 0 },
  '.MuiInputBase-input': {
    display: 'flex',
    alignItems: 'center',
  },

  '&:hover': {
    border: '1px solid #54C3FF',
  },
});

const MuiMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
});

const MenuProps = {
  PaperProps: {
    sx: {
      marginTop: '10px',
      borderRadius: '16px',
      boxShadow: 'none',

      border: '1.5px solid rgba(0, 0, 0, 0.2)',
      '.MuiMenu-list': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '.MuiMenuItem-root': {
        padding: '10px 15px',
        borderTop: '1.5px solid rgba(0, 0, 0, 0.2)',
        fontFamily: 'Inter',
      },
    },
  },
};

const SelectChain = ({ currectChainId, setChain, chains }) => {
  return chains.length > 1 ? (
    <FormControl fullWidth>
      <MuiSelect
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={currectChainId}
        label='Chain'
        onChange={setChain}
        MenuProps={MenuProps}
      >
        <Typography sx={{ padding: '10px', color: 'rgba(0, 0, 0, 0.5)' }}>
          Select Network
        </Typography>
        {chains.map((chain) => (
          <MuiMenuItem value={chain.chainId}>
            <Avatar
              src={networksLogos[chain.chainId]}
              alt={chain.name}
              height={25}
              width={25}
              style={{ marginRight: '10px' }}
            />
            {chain.name}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  ) : (
    <ChainCard chainId={chains[0].chainId} direction='To' />
  );
};

export default BridgeModal;
