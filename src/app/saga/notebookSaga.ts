import { call, put, takeLatest } from 'redux-saga/effects';

import { notebookActions } from 'app/slice/notebookSlice';
import notebookService from 'services/notebookService';
import { Notebook } from 'types';

function* notebookSaga() {
    yield takeLatest(notebookActions.fetch.type, fetchNotebook);
}

function* fetchNotebook() {
    try {
        const response: Notebook[] = yield call(notebookService.getAll);
        yield put(notebookActions.fetchSuccess(response));
    } catch (error) {
        yield put(notebookActions.fetchFailed());
    }
}

export default notebookSaga;
