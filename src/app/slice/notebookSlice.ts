import { createSlice } from '@reduxjs/toolkit';
import { fetchNotebooks } from 'app/thunk/notebookThunk';
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotebooks.pending, (state) => {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        });
        builder.addCase(fetchNotebooks.fulfilled, (state, action: any) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.notebooks = action.payload;
        });

        builder.addCase(fetchNotebooks.rejected, (state) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.notebooks = [];
        });
    },
});

export const notebookActions = notebookSlice.actions;

const notebookReducer = notebookSlice.reducer;
export default notebookReducer;
