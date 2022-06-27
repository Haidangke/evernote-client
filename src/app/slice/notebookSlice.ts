import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notebook } from 'types';

interface InitialState {
    isFetching: boolean;
    isFetchSuccess: boolean;
    isFetchFailed: boolean;

    notebooks: Notebook[];
}

const initialState: InitialState = {
    isFetching: false,
    isFetchSuccess: false,
    isFetchFailed: false,

    notebooks: [],
};

const notebookSlice = createSlice({
    name: 'notebook',
    initialState,
    reducers: {
        fetch(state) {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        },
        fetchSuccess(state, action: PayloadAction<Notebook[]>) {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.notebooks = action.payload;
        },
        fetchFailed(state) {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.notebooks = [];
        },
    },
});

export const notebookActions = notebookSlice.actions;

const notebookReducer = notebookSlice.reducer;
export default notebookReducer;
