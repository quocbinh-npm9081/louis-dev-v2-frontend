import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateAuth, ILoginResponse, IUserSubmit } from '../types';
import { loginApi } from '../../http/auth';
import { RootState } from '../store';

export const loginAction = createAsyncThunk(`auth/login`, async (user: IUserSubmit, thunkAPI) => {
  try {
    const res = loginApi('/api/auth/login', user);
    return (await res).data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

const initialState: IInitialStateAuth = {
  isLoading: false,
  currentUser: null,
  accessToken: '',
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
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.access_token;
    });
    builder.addCase(loginAction.rejected, state => {
      state.isLoading = true;
    });
  },
});

export const getAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
