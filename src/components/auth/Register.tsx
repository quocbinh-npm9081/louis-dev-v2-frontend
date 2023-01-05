import React, { useState } from 'react';
import { Box, Typography, Theme } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import TextFieldControll from '../HookForm/TextFieldControll';
import FromProvider from '../HookForm/FromProvider';
import * as yup from 'yup';
import ButtonPrimary from '../ButtonPrimary';
import LinkRoute from '../LinkRoute';
import { IUserRegisterSubmit } from '../../redux/types';
import { useAppDispatch } from '../../redux/hooks';
import { registerAction } from '../../redux/slices/authSlice';
import { toastNotiError, toastNotiSuccess } from '../../utils/toastNotifycation';
import { ALERT_VERIFY_ACCOUNT_vn } from '../../redux/types/alert';
import { useForm } from 'react-hook-form';

const validationShema = yup.object().shape({
  name: yup
    .string()
    .required('Tên không được bỏ trống !')
    .matches(/^'?(?:\p{L}\p{M}*)+(?:['\s](?:\p{L}\p{M}*)+)*'?$/u, 'Tên không chứa kí tự đặc biệt !'),
  account: yup.string().required('Vui lòng nhập email hoặc số điện thoại đầy đủ !').email('Vui lòng nhập email chính xác !'),
  password: yup.string().required('Vui lòng nhập mật khẩu !').min(6, 'Mật khẩu tối thiểu 6 kí tự !'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không trùng !'),
});
const defaultValues = {
  name: '',
  account: '',
  password: '',
  confirmPassword: '',
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
}));

const Register = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [checked, setChecked] = useState<boolean>(false);
  const [verifing, setVerifying] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { getValues } = useForm();

  const onSubmit = ({ name, account, password }: IUserRegisterSubmit) => {
    const user = { name, account, password };
    dispatch(registerAction(user))
      .then((data: any) => {
        if (registerAction.rejected.match(data)) {
          const response: any = data.payload;
          toastNotiError(String(response.error), 'light');
        } else if (registerAction.fulfilled.match(data)) {
          setVerifying(true);
          toastNotiSuccess(String(ALERT_VERIFY_ACCOUNT_vn), 'light');
        }
      })
      .catch(err => console.log(err));
  };
  if (verifing) {
    console.log(getValues());

    return (
      <Box>
        <Typography>Xác nhận Email </Typography>
      </Box>
    );
  }
  return (
    <FromProvider
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      mode='onSubmit'
      className={classes.formSubmit}
      validationShema={validationShema}
    >
      <TextFieldControll name='name' label='Tên người dùng' autoComplete='name' />
      <TextFieldControll name='account' label='Email/ Số điện thoại' autoComplete='email' />
      <Box position='relative' width='100%'>
        <TextFieldControll name='password' label='Mật khẩu' type='password' autoComplete='current-password' />
      </Box>
      <Box position='relative' width='100%'>
        <TextFieldControll name='confirmPassword' label='Nhập lại mật khẩu' type='password' autoComplete='confirmPassword-password' />{' '}
      </Box>
      <Box padding='0.5rem .1rem'>
        <Box>
          <LinkRoute to='/forgot_password' className={classes.linkHref}>
            <Typography variant='subtitle2'> Quên mật khẩu</Typography>
          </LinkRoute>
        </Box>
      </Box>
      <ButtonPrimary variant='contained' type='submit'>
        Đăng kí
      </ButtonPrimary>
      <Box padding='0.5rem .1rem'>
        <Box>
          <LinkRoute to='/login' className={classes.linkHref}>
            <Typography variant='subtitle2'>Bạn đã có tài khoản ? Đăng nhập ngay</Typography>
          </LinkRoute>
        </Box>
      </Box>
    </FromProvider>
  );
};

export default Register;
