import { all } from 'redux-saga/effects';

import noteSaga from 'features/note/noteSaga';
import notebookSaga from 'features/notebook/notebookSaga';
import { loginWatcher, registerWatcher, getUserWatcher } from 'features/auth/authSaga';
// import shortcutSaga from 'features/shortcut/shortcutSaga';
import tagSaga from 'features/tag/tagSaga';

function* rootSaga() {
    yield all([
        noteSaga(),
        tagSaga(),
        notebookSaga(),
        loginWatcher(),
        getUserWatcher(),
        registerWatcher(),
        // authSaga(),
        // , shortcutSaga()
    ]);
}

export default rootSaga;
