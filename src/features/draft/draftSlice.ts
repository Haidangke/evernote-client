import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    width: number;
}

const initialState: InitialState = {
    width: 0,
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setWidth(state, action: PayloadAction<number>) {
            state.width = action.payload;
        },
    },
});

export const draftActions = draftSlice.actions;

const draftReducer = draftSlice.reducer;

export default draftReducer;
