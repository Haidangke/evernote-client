import { call, put, takeLatest } from 'redux-saga/effects';

import { tagActions } from './tagSlice';
import tagService from 'services/tagService';
import { Tag } from 'types';

function* tagSaga() {
    yield takeLatest(tagActions.fetch.type, fetchListTag);
}

function* fetchListTag() {
    try {
        const response: Tag[] = yield call(tagService.getAll);
        yield put(tagActions.fetchSuccess(response));
    } catch (error) {
        yield put(tagActions.fetchFailed());
    }
}

export default tagSaga;
