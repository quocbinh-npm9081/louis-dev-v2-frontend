import React, { useState, FC, useMemo, useEffect, lazy } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
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
import { ALERT_REFRESH_TOKEN_DIE, ALERT_REFRESH_TOKEN_EXPIRE_en } from './redux/types/alert';
// const PageRender = lazy(() => import('./PageRender'));
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [auth, setAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(state => state.auth);
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
    console.log('check accessToken');

    dispatch(refeshToken())
      .then((data: any) => {
        const error = data.payload.error;
        console.log('error: ', data);

        if (error === ALERT_REFRESH_TOKEN_DIE) {
          setAuth(false);
        } else if (error === ALERT_REFRESH_TOKEN_EXPIRE_en) {
          setAuth(false);
        } else setAuth(true);
      })
      .catch((error: any) => console.log(error));
  }, [accessToken, dispatch]);

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
