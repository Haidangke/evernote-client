import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginParams, User, RegisterParams } from 'types';

const access_token = localStorage.getItem('access_token');

interface InitialState {
    user?: User;
    isLoggedIn: boolean;
    logging: boolean;
    registering: boolean;
    errorLogin: string;
    errorRegister: string;

    isLoading: boolean;
    isSuccess: boolean;
    isFailed: boolean;
}

const initialState: InitialState = {
    user: undefined,
    isLoggedIn: !!access_token,
    logging: false,
    errorLogin: '',
    errorRegister: '',
    registering: false,

    isLoading: false,
    isSuccess: false,
    isFailed: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

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

            state.isLoggedIn = true;
        },
        getUserFailed(state) {
            state.user = undefined;
            state.isLoading = false;
            state.isSuccess = false;
            state.isFailed = true;

            state.isLoggedIn = false;
        },
        login(state, action: PayloadAction<LoginParams>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.errorLogin = '';
            state.logging = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
            state.user = undefined;
            state.isLoggedIn = false;
            state.errorLogin = action.payload;
        },

        register(state, action: PayloadAction<RegisterParams>) {
            state.registering = true;
        },
        registerSuccess(state) {
            state.registering = false;
            state.errorRegister = '';
        },
        registerFailed(state, action: PayloadAction<string>) {
            state.registering = false;
            state.errorRegister = action.payload;
        },
    },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
