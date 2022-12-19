import './App.css';
import React, { useState, FC, useMemo } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';
import { PaletteMode } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';
import SwitchModeButton from './components/SwitchModeButton ';
const App: FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => (mode === 'light' ? createTheme(lightTheme) : createTheme(darkTheme)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Button variant='contained' color='success'>
          Hello World
        </Button>
        <SwitchModeButton />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
