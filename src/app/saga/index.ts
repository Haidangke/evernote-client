import { all } from 'redux-saga/effects';

import notebookSaga from './notebookSaga';
import noteSaga from './noteSaga';
import tagSaga from './tagSaga';

function* rootSaga() {
    yield all([noteSaga(), tagSaga(), notebookSaga()]);
}

export default rootSaga;
