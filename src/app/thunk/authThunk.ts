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

export const login = createAsyncThunk('auth/login', async (params: LoginParams, thunkAPI) => {
    try {
        const data = await authService.login(params);
        thunkAPI.dispatch(authActions.setMessage(data.msg));
        return { user: data };
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString();
        thunkAPI.dispatch(authActions.setMessage(message));
        return thunkAPI.rejectWithValue('');
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});
