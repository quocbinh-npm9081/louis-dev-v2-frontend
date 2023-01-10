import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toastNotiSuccess } from '../utils/toastNotifycation';
import WrapperOnePage from '../components/WrapperOnePage';
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const { state } = useLocation();
  useEffect(() => {
    console.log('Home render');

    if (state) toastNotiSuccess(state.message, 'light');
  }, [state]);

  return (
    <WrapperOnePage>
      Home
      <ToastContainer />
    </WrapperOnePage>
  );
};

export default Home;
