import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isSmall: boolean;
}

const initialState: InitialState = {
    isSmall: Boolean(localStorage.getItem('is_small_sidebar')),
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsSmall(state, action: PayloadAction<boolean>) {
            state.isSmall = action.payload;
            localStorage.setItem('is_small_sidebar', JSON.stringify(action.payload));
        },
    },
});

export const sidebarActions = sidebarSlice.actions;
const sidebarReducer = sidebarSlice.reducer;
export default sidebarReducer;
