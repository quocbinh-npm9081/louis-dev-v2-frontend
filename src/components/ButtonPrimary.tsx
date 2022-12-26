import React from 'react';
import { Button, Theme } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import LinkRoute from './LinkRoute';

const useStyles = makeStyles((theme: Theme) => ({
  btnPrimary: {
    padding: '6px 14px',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const ButtonPrimary: React.FC<{
  variant: 'text' | 'outlined' | 'contained';
  children: string;
  to: string;
}> = ({ variant = 'contained', children, to }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Button
      variant={variant}
      sx={{
        padding: '0!important',
      }}
    >
      <LinkRoute className={classes.btnPrimary} to={to}>
        {' '}
        {children}
      </LinkRoute>
    </Button>
  );
};

export default ButtonPrimary;
