import { call, put, takeLatest } from 'redux-saga/effects';

import { shortcutActions } from './shortcutSlice';
import shortcutService from 'services/shortcutService';
import { Shortcut } from 'types';

function* shortcutSaga() {
    yield takeLatest(shortcutActions.fetch.type, fetchShortcuts);
}

function* fetchShortcuts() {
    try {
        const response: Shortcut[] = yield call(shortcutService.getAll);
        yield put(shortcutActions.fetchSuccess(response));
    } catch (error) {
        yield put(shortcutActions.fetchFailed());
    }
}

export default shortcutSaga;
