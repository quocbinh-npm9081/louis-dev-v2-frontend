import React from 'react';
import RegisterForm from '../components/auth/Register';
import WrapperOnePage from '../components/WrapperOnePage';
import { ToastContainer } from 'react-toastify';
const Register = () => {
  return (
    <WrapperOnePage>
      <RegisterForm />
      <ToastContainer />
    </WrapperOnePage>
  );
};

export default Register;
