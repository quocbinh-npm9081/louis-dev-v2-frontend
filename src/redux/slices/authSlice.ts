import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserSubmit } from '../types';
import { loginApi } from '../../http/auth';

export const login = createAsyncThunk('auth/login', async (user: IUserSubmit, thunkAPI) => {
  try {
    const res = loginApi('/api/auth/login', user);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    errorMessage: '',
    currentUser: null,
  },
  // Các action bình thường (sync action)
  reducers: {},
  // Code logic xử lý async action
  extraReducers(builder) {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, state => {
      state.isLoading = false;
    });
  },
});
export default authSlice.reducer;
