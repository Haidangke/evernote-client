import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginParams, User, RegisterParams } from 'types';

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
    isLoggedIn: !!access_token,
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
            state.logging = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        loginFailed(state) {
            state.logging = false;
            state.user = undefined;
            state.isLoggedIn = false;
        },

        register(state, action: PayloadAction<RegisterParams>) {
            state.registering = true;
        },
        registerSuccess(state) {
            state.registering = false;
        },
        registerFailed(state) {
            state.registering = false;
        },
    },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
