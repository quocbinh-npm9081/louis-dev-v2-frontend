import React, { useState } from 'react';
import { Box, Grid, Typography, Theme } from '@mui/material';
import TextFieldControll from '../HookForm/TextFieldControll';
import FromProvider from '../HookForm/FromProvider';
import { makeStyles, useTheme } from '@mui/styles';
import * as yup from 'yup';

import ButtonPrimary from '../ButtonPrimary';
import LinkRoute from '../LinkRoute';
import CheckBoxIconShowHiden from '../CheckBoxIconShowHiden';
import { IUserSubmit } from '../../redux/types';
const validationShema = yup.object().shape({
  account: yup.string().required('Vui lòng nhập email hoặc số điện thoại đầy đủ !'),
  password: yup.string().required('Vui lòng nhập mật khẩu !'),
});
const defaultValues = {
  account: '',
  password: '',
};

const useStyles = makeStyles((theme: Theme) => ({
  formSubmit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0 1rem',
    maxWidth: '500px',
  },
  linkHref: {
    color: theme.palette.common.black,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  iconShowHidenPassword: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
  },
}));
const LoginPass = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [checked, setChecked] = useState<boolean>(false);

  const onSubmit = (data: IUserSubmit) => {
    console.log(data);
  };

  return (
    <FromProvider
      defaultValues={defaultValues}
      mode='onSubmit'
      className={classes.formSubmit}
      validationShema={validationShema}
      onSubmit={onSubmit}
    >
      <TextFieldControll name='account' label='Email/ Số điện thoại' autoComplete='email' />
      <Box position='relative' width='100%'>
        <TextFieldControll name='password' label='Mật khẩu' type={checked ? 'text' : 'password'} autoComplete='current-password' />
        <CheckBoxIconShowHiden checked={checked} setChecked={setChecked} className={classes.iconShowHidenPassword} />
      </Box>
      <Grid container spacing={4} padding='0.5rem .1rem'>
        <Grid xs={12} item>
          <LinkRoute to='/forgot_password' className={classes.linkHref}>
            <Typography variant='subtitle2'> Quên mật khẩu</Typography>
          </LinkRoute>
        </Grid>
      </Grid>
      <ButtonPrimary variant='contained' type='submit'>
        Đăng nhập
      </ButtonPrimary>
      <Grid container spacing={4} padding='0.5rem .1rem'>
        <Grid xs={12} item>
          <LinkRoute to='/register' className={classes.linkHref}>
            <Typography variant='subtitle2'>Bạn chưa có tài khoản ? Đăng kí ngay</Typography>
          </LinkRoute>
        </Grid>
      </Grid>
    </FromProvider>
  );
};

export default LoginPass;
