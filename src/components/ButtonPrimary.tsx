import React from 'react';
import { Button } from '@mui/material';

// const type TButtonType  = |  'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
const ButtonPrimary: React.FC<{
  variant: 'text' | 'outlined' | 'contained';
  children: string;
}> = ({ variant = 'contained', children }) => {
  return <Button variant={variant}>{children}</Button>;
};

export default ButtonPrimary;
