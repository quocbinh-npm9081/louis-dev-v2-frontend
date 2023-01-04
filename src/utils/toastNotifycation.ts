import { toast } from 'react-toastify';
type Theme = 'light' | 'dark' | 'colored';

export const toastNotiError = (alert: string, mode: Theme) => {
  return toast.error(`${alert}`, {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: `${mode}`,
  });
};
export const toastNotiSuccess = (alert: string, mode: Theme) => {
  return toast.success(`${alert}`, {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: `${mode}`,
  });
};
