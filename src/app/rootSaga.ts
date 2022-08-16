import { all } from 'redux-saga/effects';

import noteSaga from 'features/note/noteSaga';
import tagSaga from './saga/tagSaga';
import notebookSaga from 'features/notebook/notebookSaga';
import authSaga from 'features/auth/authSaga';
import shortcutSaga from './saga/shortcutSaga';

function* rootSaga() {
    yield all([noteSaga(), tagSaga(), notebookSaga(), authSaga(), shortcutSaga()]);
}

export default rootSaga;
