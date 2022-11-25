import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Tag, UpdateNoteParams } from 'types';

interface DateFilter {
    title: string;
    value: string;
    date: Date[];
}

interface NoteFilter {
    tags: string[];
    createdAt: DateFilter | null;
    updatedAt: DateFilter | null;
    notebook: string | null;
}

interface InitialState {
    isFetching: boolean;
    isFetchSuccess: boolean;
    isFetchFailed: boolean;

    isUpdating: boolean;
    isUpdateSuccess: boolean;
    isUpdateFailed: boolean;

    listNote: Note<Tag>[];
    filter: NoteFilter;
}

const initialState: InitialState = {
    isFetching: false,
    isFetchSuccess: false,
    isFetchFailed: false,

    isUpdating: false,
    isUpdateSuccess: false,
    isUpdateFailed: false,

    listNote: [],
    filter: {
        tags: [],
        createdAt: null,
        updatedAt: null,
        notebook: null,
    },
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        fetch(state) {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        },
        fetchSuccess(state, action: PayloadAction<Note<Tag>[]>) {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;
            state.listNote = action.payload;
        },
        fetchFailed(state) {
            state.isFetching = false;
            state.isFetchSuccess = false;
            state.isFetchFailed = true;
            state.listNote = [];
        },

        update(state, action: PayloadAction<{ id: string; params: UpdateNoteParams }>) {
            state.isUpdating = true;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = false;
        },
        updateSuccess(state) {
            state.isUpdating = false;
            state.isUpdateSuccess = true;
            state.isUpdateFailed = false;
        },
        updateFailed(state) {
            state.isUpdating = false;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = true;
        },
        updateNote(state, action: PayloadAction<Note<Tag>>) {
            const note = action.payload;
            const { _id } = note;
            const index = state.listNote?.map((note) => note._id).indexOf(_id);
            const isodate = new Date().toISOString();
            state.listNote[index] = note;
            state.listNote[index].updatedAt = isodate;
        },
        setListNote(state, action: PayloadAction<Note<Tag>[]>) {
            state.listNote = action.payload;
        },
        setFilter(state, action: PayloadAction<NoteFilter>) {
            state.filter = action.payload;
        },
    },
});

export const noteActions = noteSlice.actions;

const noteReducer = noteSlice.reducer;
export default noteReducer;
