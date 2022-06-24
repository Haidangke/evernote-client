import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Tag } from 'types';
import { fetchListNote } from '../thunk/listNoteThunk';

interface InitialState {
    isFetching: boolean;
    isSuccess: boolean;
    isFailed: boolean;
    isFetched: boolean;

    listNote: Note<Tag>[];
}

const initialState: InitialState = {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
    isFetched: false,

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
            const isodate = new Date().toISOString();
            state.listNote[index].updatedAt = isodate;
            state.listNote[index].title = note.title;
        },
        setListNote(state, action: PayloadAction<Note<Tag>[]>) {
            state.listNote = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListNote.pending, (state) => {
            state.isFetching = true;
            state.isSuccess = false;
            state.isFailed = false;
            state.isFetched = false;
        });
        builder.addCase(fetchListNote.fulfilled, (state, action: any) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isFailed = false;
            state.isFetched = true;

            state.listNote = action.payload;
        });

        builder.addCase(fetchListNote.rejected, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isFailed = false;
            state.isFetched = true;

            state.listNote = [];
        });
    },
});

export const listNoteActions = listNoteSlice.actions;

const listNoteReducer = listNoteSlice.reducer;
export default listNoteReducer;
