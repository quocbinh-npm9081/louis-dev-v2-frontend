import React, { useState, FC, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';
import { Routes, Route } from 'react-router-dom';
import SwitchModeButton from './components/SwitchModeButton ';
import PageRender from './PageRender';
const App: FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [auth, setAuth] = useState<boolean>(false);
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
        <Header auth={auth} />
        <Routes>
          <Route path='/:page/:slug' element={<PageRender />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/' element={<PageRender />} />
        </Routes>
        <CssBaseline enableColorScheme />
        {auth && <SwitchModeButton />}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
