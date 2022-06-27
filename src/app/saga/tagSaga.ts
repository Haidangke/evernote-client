import { tagActions } from 'app/slice/tagSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import tagService from 'services/tagService';
import { Tag } from 'types';

function* tagSaga() {
    yield takeLatest(tagActions.fetch.type, fetchListTag);
}

export function* fetchListTag() {
    try {
        yield put(tagActions.fetch());
        const response: Tag[] = yield call(tagService.getAll);
        yield put(tagActions.fetchSuccess(response));
    } catch (error) {
        yield put(tagActions.fetchFailed());
    }
}

export default tagSaga;
