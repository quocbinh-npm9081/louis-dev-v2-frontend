import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import LinkRoute from './LinkRoute';
import { useTheme, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

type Tseverity = 'error' | 'warning' | 'info' | 'success';
interface IAlertNoti {
  severity: Tseverity;
  message: string;
  title: string;
  action?: string;
  url?: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
}));
export const AlertNoti: React.FC<IAlertNoti> = ({ severity, message, title, action, url }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity} className={classes.alert}>
        <AlertTitle>{title}</AlertTitle>
        {message} — <strong>{url ? <LinkRoute to={`${url}`}>{action} </LinkRoute> : `${action}`}</strong>
      </Alert>
    </Stack>
  );
};
