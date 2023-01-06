import http from '.';
import { IUserLoginSubmit } from '../redux/types';
export const postApi = async (url: string, body: IUserLoginSubmit | string, token?: string) => {
  const res = await http.post(url, body, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
export const getApi = async (url: string, token?: string) => {
  const res = await http.get(url, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
