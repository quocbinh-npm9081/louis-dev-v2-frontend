import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import CircularIndeterminate from './CircularIndeterminate';
const WrapperOnePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useAppSelector(state => state.auth.isLoading);

  return (
    <Box sx={{ display: 'flex', height: '90vh', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <CircularIndeterminate />}
      {!isLoading && <>{children}</>}
    </Box>
  );
};

export default WrapperOnePage;
