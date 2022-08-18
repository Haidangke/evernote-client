import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from 'types';

interface InitialState {
    isFetching: boolean;
    isFetchSuccess: boolean;
    isFetchFailed: boolean;

    listTag: Tag[];
}

const initialState: InitialState = {
    isFetching: false,
    isFetchSuccess: false,
    isFetchFailed: false,

    listTag: [],
};

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        setListTag(state, action: PayloadAction<Tag[]>) {
            state.listTag = action.payload;
        },

        fetch(state) {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        },
        fetchSuccess(state, action: PayloadAction<Tag[]>) {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.listTag = action.payload;
        },
        fetchFailed(state) {
            state.isFetching = false;
            state.isFetchSuccess = false;
            state.isFetchFailed = true;

            state.listTag = [];
        },
    },
});

export const tagActions = tagSlice.actions;

const tagReducer = tagSlice.reducer;
export default tagReducer;
