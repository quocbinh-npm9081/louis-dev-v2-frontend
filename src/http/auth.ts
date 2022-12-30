import http from '.';
import { IUserSubmit } from '../redux/types';
export const loginApi = async (url: string, user: IUserSubmit, token?: string) => {
  const res = await http.post(url, user, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
