import React, { FC, useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import DarkIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../ColorModeContext';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

const SwitchModeButton: FC = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <>
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} color='inherit' onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </>
  );
};

export default SwitchModeButton;
