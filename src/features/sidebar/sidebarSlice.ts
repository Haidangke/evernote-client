import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TopicValue } from 'types';

interface InitialState {
    isSmall: boolean;

    isSlide: boolean;
    topic?: string;
}

const initialState: InitialState = {
    isSmall: JSON.parse(localStorage.getItem('is_small_sidebar') || 'false'),
    isSlide: false,
    topic: undefined,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsSmall(state, action: PayloadAction<boolean>) {
            state.isSmall = action.payload;
            localStorage.setItem('is_small_sidebar', JSON.stringify(action.payload));
        },

        setIsSlide(state, action: PayloadAction<boolean>) {
            state.isSlide = action.payload;
        },

        setTopic(state, action: PayloadAction<string>) {
            state.topic = action.payload;
        },
    },
});

export const sidebarActions = sidebarSlice.actions;
const sidebarReducer = sidebarSlice.reducer;
export default sidebarReducer;
