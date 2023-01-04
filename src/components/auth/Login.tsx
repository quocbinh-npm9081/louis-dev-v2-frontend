import React, { useState } from 'react';
import { Box, Typography, Theme } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import TextFieldControll from '../HookForm/TextFieldControll';
import FromProvider from '../HookForm/FromProvider';
import * as yup from 'yup';
import ButtonPrimary from '../ButtonPrimary';
import LinkRoute from '../LinkRoute';
import CheckBoxIconShowHiden from '../CheckBoxIconShowHiden';
import { IUserLoginSubmit } from '../../redux/types';
import { useAppDispatch } from '../../redux/hooks';
import { loginAction } from '../../redux/slices/authSlice';
import { toastNotiError, toastNotiSuccess } from '../../utils/toastNotifycation';
import { ALERT_LOGIN_SUCCESS_vn } from '../../redux/types/alert';
const validationShema = yup.object().shape({
  account: yup.string().email('Vui lòng nhập email chinh xác !').required('Vui lòng nhập email hoặc số điện thoại đầy đủ !'),
  password: yup.string().min(6, 'Mật khẩu phải hơn 6 kí tự !').required('Vui lòng nhập mật khẩu !'),
});

const defaultValues = {
  account: '',
  password: '',
};

const useStyles = makeStyles((theme: Theme) => ({
  formSubmit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDispatch = async (user: IUserLoginSubmit) => {
    const resultDispatch = await dispatch(loginAction(user));
    if (loginAction.fulfilled.match(resultDispatch)) {
      const message = ALERT_LOGIN_SUCCESS_vn;
      toastNotiSuccess(message, 'light');
    } else if (loginAction.rejected.match(resultDispatch)) {
      const response: any = resultDispatch.payload;
      toastNotiError(String(response.error), 'light');
    }
  };

  const onSubmit = (user: IUserLoginSubmit) => {
    handleDispatch(user);
  };

  return (
    <FromProvider
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      mode='onSubmit'
      className={classes.formSubmit}
      validationShema={validationShema}
    >
      <TextFieldControll name='account' label='Email/ Số điện thoại' autoComplete='email' />
      <Box position='relative' width='100%'>
        <TextFieldControll name='password' label='Mật khẩu' type={checked ? 'text' : 'password'} autoComplete='current-password' />
        <CheckBoxIconShowHiden checked={checked} setChecked={setChecked} className={classes.iconShowHidenPassword} />
      </Box>
      <Box padding='0.5rem .1rem'>
        <Box>
          <LinkRoute to='/forgot_password' className={classes.linkHref}>
            <Typography variant='subtitle2'> Quên mật khẩu</Typography>
          </LinkRoute>
        </Box>
      </Box>
      <ButtonPrimary variant='contained' type='submit'>
        Đăng nhập
      </ButtonPrimary>
      <Box padding='0.5rem .1rem'>
        <Box>
          <LinkRoute to='/register' className={classes.linkHref}>
            <Typography variant='subtitle2'>Bạn chưa có tài khoản ? Đăng kí ngay</Typography>
          </LinkRoute>
        </Box>
      </Box>
    </FromProvider>
  );
};

export default Login;
