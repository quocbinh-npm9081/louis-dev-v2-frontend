import React from 'react';
import LoginForm from '../components/auth/Login';
import WrapperOnePage from '../components/WrapperOnePage';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  return (
    <WrapperOnePage>
      <LoginForm />
      <ToastContainer />
    </WrapperOnePage>
  );
};

export default Login;
