import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest, take } from 'redux-saga/effects';

import history from 'routes/history';
import authService from 'services/authService';
import userService from 'services/userService';
import { LoginParams, RegisterParams, Response, User } from 'types';
import { authActions } from './authSlice';

function* loginWatcher() {
    while (true) {
        const isLoggedIn = localStorage.getItem('access_token');
        if (!isLoggedIn) {
            const action: PayloadAction<LoginParams> = yield take(authActions.login.type);
            yield fork(loginFlow, action.payload);
        }

        yield take(authActions.logout.type);
        yield call(logoutFlow);
    }
}

function* registerWatcher() {
    yield takeLatest(authActions.register.type, registerFlow);
}

function* getUserWatcher() {
    yield takeLatest(authActions.getUser.type, getUserFlow);
}

function* loginFlow(loginPayload: LoginParams) {
    try {
        const response: Response<string> = yield call(authService.login, loginPayload);
        const { data } = response;
        if (data) {
            localStorage.setItem('access_token', JSON.stringify(data));
            yield put(authActions.loginSuccess());
            history.navigate('/');
        }
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString();
        yield put(authActions.loginFailed(message));
    }
}

function* registerFlow(action: PayloadAction<RegisterParams>) {
    const params = action.payload;

    try {
        yield call(authService.register, params);

        yield put(authActions.registerSuccess());
        history.navigate('/login');
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString();

        yield put(authActions.registerFailed(message));
    }
}

function* logoutFlow() {
    localStorage.removeItem('access_token');
    history.navigate('/login');
    yield put(authActions.logout());
}

function* getUserFlow() {
    try {
        const user: User = yield call(userService.getInfoUser);
        yield put(authActions.getUserSuccess(user));
    } catch (error) {
        yield put(authActions.getUserFailed());
        yield call(logoutFlow);
    }
}

export { loginWatcher, registerWatcher, getUserWatcher };
