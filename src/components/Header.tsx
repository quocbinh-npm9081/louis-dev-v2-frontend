import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, Button, Theme, Typography } from '@mui/material';
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    width: '100%',
    height: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3rem 1rem',
    backgroundColor: '#000',
    color: '#fff',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
  },
}));
const Header = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Box className={classes.header}>
      <Typography variant='h3' className={classes.logo}>
        Louis Q Dev
      </Typography>
      <Box>
        <Button variant='text' className='btnPrimary'>
          Đăng nhập
        </Button>
        <Button variant='outlined'>Đăng xuất</Button>
      </Box>
    </Box>
  );
};

export default Header;
