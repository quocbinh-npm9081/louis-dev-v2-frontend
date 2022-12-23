import React, { useState, FC, useMemo } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';
import { PaletteMode } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';
import SwitchModeButton from './components/SwitchModeButton ';
import { Routes, Route } from 'react-router-dom';
import PageRender from './PageRender';
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
        <Routes>
          <Route path='/:page/:slug' element={<PageRender />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/' element={<PageRender />} />
        </Routes>
        <CssBaseline enableColorScheme />

        <SwitchModeButton />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
