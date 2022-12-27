import http from '.';
import { IUserSubmit } from '../redux/types';
import axios from 'axios';
export const loginApi = async (url: string, user: IUserSubmit, token?: string) => {
  return await http.post(url, user, {
    headers: {
      Authorization: token,
    },
  });
};
