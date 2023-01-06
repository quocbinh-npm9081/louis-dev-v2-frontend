import React, { useState, FC, useMemo, useEffect, lazy } from 'react';
import { useAppDispatch } from './redux/hooks';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';
import { Routes, Route } from 'react-router-dom';
import { refeshToken } from './redux/slices/authSlice';
import SwitchModeButton from './components/SwitchModeButton ';
import PageRender from './PageRender';
// const PageRender = lazy(() => import('./PageRender'));
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [auth, setAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => (mode === 'light' ? createTheme(lightTheme) : createTheme(darkTheme)), [mode]);

  useEffect(() => {
    dispatch(refeshToken());
  }, []);

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
