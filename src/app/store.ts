import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer, toolbarReducer } from './slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toolbar: toolbarReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
