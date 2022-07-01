import { call, put, takeLatest } from 'redux-saga/effects';

import { authActions } from 'app/slice/authSlice';
import userService from 'services/userService';
import { User } from 'types';

function* authSaga() {
    yield takeLatest(authActions.getUser.type, getUser);
}

function* getUser() {
    try {
        const user: User = yield call(userService.getInfoUser);
        yield put(authActions.getUserSuccess(user));
    } catch (error) {
        yield put(authActions.getUserFailed());
    }
}

export default authSaga;
