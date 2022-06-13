import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Tag } from '~/types';
import { RootState } from '../store';
import { fetchListNote } from '../thunk/listNoteThunk';

interface InitialState {
    isFetching: boolean;
    isFetchSuccess: boolean;
    isFetchFailed: boolean;

    listNote: Note<Tag>[];
}

const initialState: InitialState = {
    isFetching: false,
    isFetchSuccess: false,
    isFetchFailed: false,

    listNote: [] as Note<Tag>[],
};

const listNoteSlice = createSlice({
    name: 'listNote',
    initialState,
    reducers: {
        updateNote(state, action: PayloadAction<Note<Tag>>) {
            const note = action.payload;
            const { _id } = note;
            const index = state.listNote?.map((note) => note._id).indexOf(_id);

            state.listNote[index].title = note.title;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListNote.pending, (state) => {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        });
        builder.addCase(fetchListNote.fulfilled, (state, action: any) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.listNote = action.payload;
        });

        builder.addCase(fetchListNote.rejected, (state) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.listNote = [];
        });
    },
});

export const listNoteActions = listNoteSlice.actions;

export const selectListNote = (state: RootState) => state.listNote.listNote;

const listNoteReducer = listNoteSlice.reducer;
export default listNoteReducer;
