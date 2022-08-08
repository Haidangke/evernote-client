import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shortcut } from 'types';

interface InitialState {
    isFetching: boolean;
    isFetchSuccess: boolean;
    isFetchFailed: boolean;
    shortcuts: Shortcut[];
}

const initialState: InitialState = {
    isFetching: false,
    isFetchSuccess: false,
    isFetchFailed: false,
    shortcuts: [],
};

const shortcutSlice = createSlice({
    name: 'shortcut',
    initialState,
    reducers: {
        fetch(state) {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        },
        fetchSuccess(state, action: PayloadAction<Shortcut[]>) {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.shortcuts = action.payload;
        },
        fetchFailed(state) {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.shortcuts = [];
        },
        setShortcuts(state, action: PayloadAction<Shortcut[]>) {
            state.shortcuts = action.payload;
        },
    },
});

export const shortcutActions = shortcutSlice.actions;
export default shortcutSlice.reducer;
