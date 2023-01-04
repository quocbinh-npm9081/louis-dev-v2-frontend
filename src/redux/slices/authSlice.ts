import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateAuth, ILoginResponse, IUserSubmit } from '../types';
import { loginApi } from '../../http/auth';
import { RootState } from '../store';
import {
  ALERT_LOGIN_SUCCESS_en,
  ALERT_LOGIN_SUCCESS_vn,
  ALERT_USER_NOT_FOUND_en,
  ALERT_USER_NOT_FOUND_vn,
  ALERT_USER_PASS_WRONG_en,
  ALERT_USER_PASS_WRONG_vn,
} from '../types/alert';

export const loginAction = createAsyncThunk(`auth/login`, async (user: IUserSubmit, thunkAPI) => {
  try {
    const res = loginApi('/api/auth/login', user);
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
  },
});

export const getAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
