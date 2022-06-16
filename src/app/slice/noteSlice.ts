import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Tag } from 'types';
import { fetchNote, updateNote } from '../thunk/noteThunk';

interface InitialState {
    isFetching: boolean;
    isFetchSuccess: boolean;
    isFetchFailed: boolean;

    isUpdating: boolean;
    isUpdateSuccess: boolean;
    isUpdateFailed: boolean;

    isLoading: boolean;
    note?: Note<Tag>;
}

const initialState: InitialState = {
    isFetching: false,
    isFetchSuccess: false,
    isFetchFailed: false,

    isUpdating: false,
    isUpdateSuccess: false,
    isUpdateFailed: false,

    isLoading: false,
    note: undefined,
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNote.pending, (state) => {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        });
        builder.addCase(fetchNote.fulfilled, (state, action: any) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.note = action.payload;
        });

        builder.addCase(fetchNote.rejected, (state) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.note = undefined;
        });

        builder.addCase(updateNote.pending, (state, action: any) => {
            state.isUpdating = true;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = false;
        });

        builder.addCase(updateNote.fulfilled, (state, action: any) => {
            state.isUpdating = false;
            state.isUpdateSuccess = true;
            state.isUpdateFailed = false;
        });

        builder.addCase(updateNote.rejected, (state) => {
            state.isUpdating = false;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = true;
        });
    },
});

export const noteActions = noteSlice.actions;

const noteReducer = noteSlice.reducer;
export default noteReducer;
