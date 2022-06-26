import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    isFetched: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        fetchData(state) {
            state.isFetching = true;
            state.isFetched = false;
        },
        fetchDataComplete(state) {
            state.isFetching = false;
            state.isFetched = true;
        },
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
