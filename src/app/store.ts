import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import editorReducer from 'features/editor/editorSlice';
import noteReducer from 'features/note/noteSlice';
import authReducer from 'features/auth/authSlice';
import notebookReducer from 'features/notebook/notebookSlice';
import { tagReducer, shortcutReducer } from './slice';
import rootSaga from './rootSaga';
import sidebarReducer from 'features/sidebar/sidebarSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    note: noteReducer,
    tag: tagReducer,
    notebook: notebookReducer,
    editor: editorReducer,
    shortcut: shortcutReducer,
    sidebar: sidebarReducer
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
