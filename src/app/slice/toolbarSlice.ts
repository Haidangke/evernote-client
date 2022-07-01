import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    toolbar: Array<{
        isOverflow: boolean;
        format: string;
    }>;
}

const initialState: InitialState = {
    toolbar: [
        {
            isOverflow: false,
            format: 'bold',
        },
        {
            isOverflow: false,
            format: 'italic',
        },
        {
            isOverflow: false,
            format: 'underline',
        },

        {
            isOverflow: false,
            format: 'bulleted-list',
        },
        {
            isOverflow: false,
            format: 'numbered-list',
        },
        {
            isOverflow: false,
            format: 'check-list-item',
        },

        {
            isOverflow: false,
            format: 'indent',
        },
        {
            isOverflow: false,
            format: 'outdent',
        },
        {
            isOverflow: false,
            format: 'left',
        },
        {
            isOverflow: false,
            format: 'center',
        },
        {
            isOverflow: false,
            format: 'right',
        },
        {
            isOverflow: false,
            format: 'sup',
        },
        {
            isOverflow: false,
            format: 'sub',
        },
        {
            isOverflow: false,
            format: 'through',
        },
    ],
};

const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,
    reducers: {
        setOverflow(state, action: PayloadAction<{ format: string; value: boolean }>) {
            const { format, value } = action.payload;
            const index = state.toolbar.map((x) => x.format).indexOf(format);
            state.toolbar[index].isOverflow = value;
        },
    },
});

export const toolbarActions = toolbarSlice.actions;

const toolbarReducer = toolbarSlice.reducer;

export default toolbarReducer;
