import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import authService from 'services/authService';
import userService from 'services/userService';
import { LoginParams, RegisterParams, Response, User } from 'types';
import history from 'routes/history';
import { authActions } from './authSlice';

function* authSaga() {
    yield takeLatest(authActions.login.type, login);
    yield takeLatest(authActions.getUser.type, getUser);
    yield takeLatest(authActions.register.type, register);
}

function* login(action: PayloadAction<LoginParams>) {
    const params = action.payload;

    try {
        const response: Response<User> = yield call(authService.login, params);
        const { data } = response;
        if (data) {
            localStorage.setItem('access_token', JSON.stringify(data));
            yield put(authActions.clearMessage());
            yield put(authActions.loginSuccess(data));
            history.navigate('/');
        }
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString();
        yield put(authActions.loginFailed());
        yield put(authActions.setMessage(message));
    }
}

function* register(action: PayloadAction<RegisterParams>) {
    const params = action.payload;

    try {
        const response: Response<any> = yield call(authService.register, params);

        yield put(authActions.setMessage(response.msg));
        yield put(authActions.registerSuccess());
        history.navigate('/login');
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        yield put(authActions.setMessage(message));
        yield put(authActions.registerFailed());
    }
}

function* getUser() {
    try {
        const user: User = yield call(userService.getInfoUser);
        yield put(authActions.getUserSuccess(user));
    } catch (error) {
        yield put(authActions.getUserFailed());
        yield call(authService.logout);
    }
}


export default authSaga;
