import { all } from 'redux-saga/effects';

import noteSaga from 'features/note/noteSaga';
import notebookSaga from 'features/notebook/notebookSaga';
import authSaga from 'features/auth/authSaga';
import shortcutSaga from 'features/shortcut/shortcutSaga';
import tagSaga from 'features/tag/tagSaga';

function* rootSaga() {
    yield all([noteSaga(), tagSaga(), notebookSaga(), authSaga(), shortcutSaga()]);
}

export default rootSaga;
