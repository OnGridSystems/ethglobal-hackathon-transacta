import { styled } from '@mui/material/styles';
import { Select, MenuItem, Typography, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { supportedChainIds } from '../constants';

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
        {/* <MuiMenuItem value={42}>
          <div
            style={{
              width: '30px',
              height: '30px',
              background: 'red',
              marginRight: '5px',
            }}></div>
          KOVAN
        </MuiMenuItem> */}
        <Typography sx={{ padding: '10px' }}>Select Network</Typography>
        <MuiMenuItem value={97}>
          <div
            style={{
              width: '25px',
              height: '25px',
              background: '#dbb2e3',
              marginRight: '5px',
              borderRadius: '50%',
            }}></div>
          BSC
        </MuiMenuItem>
        <MuiMenuItem value={80001}>
          <div
            style={{
              width: '25px',
              height: '25px',
              background: '#f1e71f',
              marginRight: '5px',
              borderRadius: '50%',
            }}></div>
          POLYGON
        </MuiMenuItem>
      </MuiSelect>
    </FormControl>
  );
};

export default NetworkSelect;
