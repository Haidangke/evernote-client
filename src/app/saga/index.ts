import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

import notebookSaga from './notebookSaga';
import noteSaga from './noteSaga';
import shortcutSaga from './shortcutSaga';
import tagSaga from './tagSaga';

function* rootSaga() {
    yield all([noteSaga(), tagSaga(), notebookSaga(), authSaga(), shortcutSaga()]);
}

export default rootSaga;
