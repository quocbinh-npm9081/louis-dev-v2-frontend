import React from 'react';
import { Box } from '@mui/material';
const WrapperOnePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Box sx={{ display: 'flex', height: '90vh', justifyContent: 'center', alignItems: 'center' }}>{children}</Box>;
};

export default WrapperOnePage;
