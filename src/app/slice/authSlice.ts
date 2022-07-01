import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'types';
import { login, logout, register } from '../thunk/authThunk';

const access_token = localStorage.getItem('access_token');

interface InitialState {
    user?: User;
    isLoggedIn: boolean;
    logging: boolean;
    registering: boolean;
    message: string;

    isLoading: boolean;
    isSuccess: boolean;
    isFailed: boolean;
}

const initialState: InitialState = {
    user: undefined,
    isLoggedIn: Boolean(access_token),
    logging: false,
    message: '',
    registering: false,

    isLoading: false,
    isSuccess: false,
    isFailed: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
        clearMessage(state) {
            state.message = '';
        },

        getUser(state) {
            state.isLoading = true;
            state.isSuccess = false;
            state.isFailed = false;
        },
        getUserSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isFailed = false;
        },
        getUserFailed(state) {
            state.user = undefined;
            state.isLoading = false;
            state.isSuccess = false;
            state.isFailed = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registering = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.registering = false;
        });

        builder.addCase(register.rejected, (state) => {
            state.registering = false;
        });

        builder.addCase(login.pending, (state, action: any) => {
            state.logging = true;
            state.isLoggedIn = false;
            state.user = action.payload;
        });

        builder.addCase(login.fulfilled, (state, action: any) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.user = action.payload;
        });

        builder.addCase(login.rejected, (state) => {
            state.logging = false;
            state.isLoggedIn = false;
            state.user = undefined;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        });
    },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
