import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    fontSize: string;
    color: string;
}

const initialState: InitialState = {
    fontSize: '16px',
    color: '#333',
};

const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,
    reducers: {},
});

const toolbarReducer = toolbarSlice.reducer;
export default toolbarReducer;
