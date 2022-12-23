import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, Theme, Typography } from '@mui/material';
import ButtonPrimary from './ButtonPrimary';
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
        <ButtonPrimary variant='text'>Đăng nhập</ButtonPrimary>
        <ButtonPrimary variant='contained'>Đăng xuất</ButtonPrimary>
      </Box>
    </Box>
  );
};

export default Header;
