import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateAuth, ILoginResponse, IUserLoginSubmit, IUserRegisterSubmit } from '../types';
import { getApi, postApi } from '../../http/auth';
import { RootState } from '../store';
import {
  ALERT_REGISTER_ACCOUNT_EXISTS_en,
  ALERT_REGISTER_ACCOUNT_EXISTS_vn,
  ALERT_USER_NOT_FOUND_en,
  ALERT_USER_NOT_FOUND_vn,
  ALERT_USER_PASS_WRONG_en,
  ALERT_USER_PASS_WRONG_vn,
} from '../types/alert';

export const loginAction = createAsyncThunk('auth/login', async (user: IUserLoginSubmit, thunkAPI) => {
  try {
    const res = postApi('/api/auth/login', user);
    const access_token = (await res).data.access_token;
    localStorage.setItem('logged', access_token);
    return (await res).data;
  } catch (error: any) {
    const statusCode = error.response.status;
    const msg = error.response.data.msg;
    let errorMessage = '';
    if (msg == ALERT_USER_NOT_FOUND_en) {
      errorMessage = ALERT_USER_NOT_FOUND_vn;
    } else if (msg == ALERT_USER_PASS_WRONG_en) {
      errorMessage = ALERT_USER_PASS_WRONG_vn;
    }
    return thunkAPI.rejectWithValue({ error: errorMessage, status: statusCode });
  }
});

export const registerAction = createAsyncThunk('auth/register', async (user: IUserRegisterSubmit, thunkAPI) => {
  try {
    const res = postApi('/api/auth/register', user);
    return (await res).data;
  } catch (error: any) {
    const statusCode = error.response.status;
    const msg = error.response.data.msg;
    let errorMessage = '';
    if (msg == ALERT_REGISTER_ACCOUNT_EXISTS_en) {
      errorMessage = ALERT_REGISTER_ACCOUNT_EXISTS_vn;
    }
    return thunkAPI.rejectWithValue({ error: errorMessage, status: statusCode });
  }
});

export const activeAccount = createAsyncThunk('auth/active', async (active_token: string, thunkAPI) => {
  try {
    const res = postApi('/api/auth/active', active_token);
    return (await res).data;
  } catch (error: any) {
    const statusCode = error.response.status;
    const msg = error.response.data.msg;
    return thunkAPI.rejectWithValue({ error: msg, status: statusCode });
  }
});

export const refeshToken = createAsyncThunk('auth/refeshToken', async () => {
  const access_token = localStorage.getItem('logged');
  if (!access_token) {
    try {
      const res = getApi('/api/auth/refresh_token');
      return (await res).data;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  } else return true;
});

const initialState: IInitialStateAuth = {
  isLoading: false,
  currentUser: null,
  accessToken: '',
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  // Các action bình thường (sync action)
  reducers: {},
  // Code logic xử lý async action
  extraReducers(builder) {
    //LOGIN
    builder.addCase(loginAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
      state.isLoading = false;
      state.message = action.payload.msg;
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.access_token;
    });
    builder.addCase(loginAction.rejected, (state, action: any) => {
      state.isLoading = false;
    });
    //REGISTER
    builder.addCase(registerAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerAction.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(registerAction.rejected, state => {
      state.isLoading = false;
    });
    //ACTIVE ACCOUT
    builder.addCase(activeAccount.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(activeAccount.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(activeAccount.rejected, state => {
      state.isLoading = false;
    });
    //REFESH TOKEN
    builder.addCase(refeshToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(refeshToken.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(refeshToken.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const getAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
