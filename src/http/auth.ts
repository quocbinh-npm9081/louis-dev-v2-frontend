import http from '.';
import { IUserLoginSubmit } from '../redux/types';
export const postApi = async (url: string, user: IUserLoginSubmit, token?: string) => {
  const res = await http.post(url, user, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
