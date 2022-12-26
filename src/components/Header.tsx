import React, { FC } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, Theme, Typography } from '@mui/material';
import FromProvider from './HookForm/FromProvider';
import ActionMenu from './ActionMenu';
import SearchAppBar from './SearchAppBar';
// export type TSelectTypeListStaff =
//   | 'region'
//   | 'unit'
//   | 'department'
//   | 'division'
//   | 'restaurant'
//   | 'position'
//   | 'level'
//   | 'outlookMail';
// export const SelectTypeListStaff: { [key in TSelectTypeListStaff]: TSelectTypeListStaff } = {
//   region: 'region',
//   unit: 'unit',
//   department: 'department',
//   division: 'division',
//   restaurant: 'restaurant',
//   position: 'position',
//   level: 'level',
//   outlookMail: 'outlookMail',
// };
//   value: SelectTypeListStaff.region,

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    width: '100%',
    height: '1.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3rem 1rem',
    backgroundColor: theme.palette.common.black,
  },
  headerCenter: {
    justifyContent: 'center!important',
  },
  logo: {
    color: theme.palette.common.white,
    fontSize: '2rem',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
  },
}));
const defaultValues = {
  search: '',
};
const Header: FC<{ auth: boolean }> = ({ auth }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Box className={auth ? classes.header : `${classes.header} ${classes.headerCenter}`}>
      <Typography variant='h3' className={classes.logo}>
        Louis Q Dev
      </Typography>
      {auth && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FromProvider defaultValues={defaultValues} mode='onChange'>
            <SearchAppBar />
          </FromProvider>
          <ActionMenu />
        </Box>
      )}
    </Box>
  );
};

export default Header;
