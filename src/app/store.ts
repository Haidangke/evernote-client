import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {
    authReducer,
    noteReducer,
    toolbarReducer,
    listNoteReducer,
    listTagReducer,
    notebookReducer,appReducer
} from './slice';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    note: noteReducer,
    listNote: listNoteReducer,
    listTag: listTagReducer,
    notebook: notebookReducer,
    toolbar: toolbarReducer,
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
