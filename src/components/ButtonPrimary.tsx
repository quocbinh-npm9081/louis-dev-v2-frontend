import React from 'react';
import { Button, Theme, Box } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import LinkRoute from './LinkRoute';

const useStyles = makeStyles((theme: Theme) => ({
  btnPrimary: {
    padding: '6px 14px',
    color: theme.palette.secondary.main,
    width: '100%',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      '&:hover': {
        color: '#000',
      },
    },
  },
}));

const ButtonPrimary: React.FC<{
  variant: 'text' | 'outlined' | 'contained';
  children: string;
  to?: string;
  type?: 'submit';
}> = ({ variant = 'contained', children, to, type }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Button
      variant={variant}
      type={type}
      fullWidth
      sx={{
        padding: '0!important',
      }}
    >
      {to && (
        <LinkRoute className={classes.btnPrimary} to={to}>
          {' '}
          {children}
        </LinkRoute>
      )}
      {!to && <Box className={classes.btnPrimary}>{children}</Box>}
    </Button>
  );
};

export default ButtonPrimary;
