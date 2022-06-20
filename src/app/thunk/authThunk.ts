import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'services/authService';
import { LoginParams, RegisterParams } from 'types';
import { authActions } from '../slice/authSlice';

export const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterParams, thunkAPI) => {
        try {
            const response = await authService.register(params);

            thunkAPI.dispatch(authActions.setMessage(response.msg));
            return response.data;
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(authActions.setMessage(message));
            return thunkAPI.rejectWithValue('');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (params: { formValue: LoginParams; remember: boolean }, thunkAPI) => {
        try {
            const response = await authService.login(params.formValue);
            const { data, msg } = response;
            if (params.remember) {
                if (data?.accessToken) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
            } else {
                localStorage.removeItem('user');
            }
            thunkAPI.dispatch(authActions.setMessage(msg));
            return { user: data };
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.msg) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(authActions.setMessage(message));
            return thunkAPI.rejectWithValue('');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});
