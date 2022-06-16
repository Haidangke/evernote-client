import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '~/types';
import { fetchListTag } from '../thunk/listTagThunk';

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

const listTagSlice = createSlice({
    name: 'listTag',
    initialState,
    reducers: {
        setListtag(state, action: PayloadAction<Tag[]>) {
            state.listTag = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListTag.pending, (state) => {
            state.isFetching = true;
            state.isFetchSuccess = false;
            state.isFetchFailed = false;
        });
        builder.addCase(fetchListTag.fulfilled, (state, action: any) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.listTag = action.payload;
        });

        builder.addCase(fetchListTag.rejected, (state) => {
            state.isFetching = false;
            state.isFetchSuccess = true;
            state.isFetchFailed = false;

            state.listTag = [];
        });
    },
});

export const tagActions = listTagSlice.actions;

const listTagReducer = listTagSlice.reducer;
export default listTagReducer;
