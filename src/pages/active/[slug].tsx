import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { activeAccount } from '../../redux/slices/authSlice';
import WrapperOnePage from '../../components/WrapperOnePage';
import CircularIndeterminate from '../../components/CircularIndeterminate';
import { AlertNoti } from '../../components/AlertNoti';
import { ALERT_JWT_EXPIRE_vn, ALERT_JWT_EXPIRE_en, ALERT_JWT_MALFORMED_en } from '../../redux/types/alert';
type TParams = {
  slug: string;
  page: string;
};
const Active = () => {
  const { slug } = useParams<TParams>();
  const dispatch = useAppDispatch();
  const [isExpire, setIExpire] = useState<boolean>(false);
  const [isMalformed, setIsMalformed] = useState<boolean>(false);
  const { isLoading } = useAppSelector(state => state.auth);
  useEffect(() => {
    dispatch(activeAccount(Object({ active_token: slug })))
      .then((data: any) => {
        if (activeAccount.rejected.match(data)) {
          const res: any = data.payload;
          if (res.error === ALERT_JWT_EXPIRE_en) {
            setIExpire(true);
          } else if (res.error.message === ALERT_JWT_MALFORMED_en) {
            setIsMalformed(true);
          }
        }
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }, [slug]);

  return (
    <WrapperOnePage>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <>
          {isExpire && (
            <AlertNoti
              title='Ooop! Hết hạn rồi'
              message={ALERT_JWT_EXPIRE_vn}
              severity='error'
              action='Đăng kí lại ngay !'
              url='/register'
            />
          )}
          {isMalformed && (
            <AlertNoti
              title='Oh noo! Bạn chưa có tài khoản'
              message={ALERT_JWT_EXPIRE_vn}
              severity='info'
              action='Đăng kí ngay !'
              url='/register'
            />
          )}{' '}
        </>
      )}{' '}
    </WrapperOnePage>
  );
};

export default Active;
