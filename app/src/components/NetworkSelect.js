import { styled } from '@mui/material/styles';
import { Select, MenuItem, Typography, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { supportedChainIds } from '../constants';
import networks from '../networks.json';
import { networksLogos } from '../constants';

const MuiSelect = styled(Select)({
  borderRadius: '8px',
  height: '50px',
  minWidth: '160px',
  '.MuiOutlinedInput-notchedOutline': { border: 0 },
  '.MuiInputBase-input': {
    display: 'flex',
    alignItems: 'center',
  },
});

const MuiMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
});

const MenuProps = {
  PaperProps: {
    sx: {
      minWidth: '180px !important',
      marginTop: '10px',
      '.MuiMenu-list': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '.MuiMenuItem-root': {
        padding: '15px 10px',
      },
    },
  },
};

const getNetworks = () =>
  Object.keys(networks).map((id) => ({
    networkId: id,
    name: networks[id].name,
  }));
const avaibleNetworks = getNetworks();

const NetworkSelect = ({ chainId, changeNetwork }) => {
  return (
    <FormControl error={!supportedChainIds.includes(Number(chainId))}>
      {!supportedChainIds.includes(Number(chainId)) && (
        <InputLabel id='demo-simple-select-disabled-label'>
          wrong network
        </InputLabel>
      )}
      <MuiSelect
        labelId='demo-simple-select-disabled-label'
        value={!supportedChainIds.includes(Number(chainId)) ? '' : chainId}
        onChange={changeNetwork}
        MenuProps={MenuProps}>
        <MenuItem sx={{ display: 'none' }} value=''></MenuItem>
        <Typography sx={{ padding: '10px' }}>Select Network</Typography>
        {avaibleNetworks.map((network) => (
          <MuiMenuItem value={+network.networkId} key={network.networkId}>
            <img
              src={networksLogos[network.networkId]}
              alt={network.name}
              height={25}
              width={25}
              style={{ marginRight: '10px' }}
            />
            {network.name}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default NetworkSelect;
