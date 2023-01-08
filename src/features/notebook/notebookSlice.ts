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
        setNotebooks(state, action: PayloadAction<Notebook[]>) {
            state.notebooks = action.payload;
        },
        updateNotebook(state, action: PayloadAction<Notebook>) {
            const notebook = action.payload;
            const index = state.notebooks.map((notebook) => notebook._id).indexOf(notebook._id);
            let newNotebooks = [...state.notebooks];

            if (notebook.isDefault) {
                newNotebooks = [...state.notebooks].map((notebook) => ({
                    ...notebook,
                    isDefault: false,
                }));
            }

            newNotebooks[index] = notebook;

            state.notebooks = newNotebooks;
        },
    },
});

export const notebookActions = notebookSlice.actions;

const notebookReducer = notebookSlice.reducer;
export default notebookReducer;
