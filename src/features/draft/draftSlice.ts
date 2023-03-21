import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    width: number;
    isToolbar: boolean;
    toolbar: {
        [key: string]: boolean;
    };
}

const initialState: InitialState = {
    isToolbar: false,
    width: 0,
    toolbar: {
        BOLD: false,
        ITALIC: false,
        UNDERLINE: false,
        'unordered-list-item': false,
        'ordered-list-item': false,
        'check-list-item': false,
        LINK: false,
        ALIGN: false,
        INDENT: false,
        OUTDENT: false,
        STRIKETHROUGH: false,
    },
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setWidth(state, action: PayloadAction<number>) {
            state.width = action.payload;
        },
        setIsToolbar(state, action: PayloadAction<boolean>) {
            state.isToolbar = action.payload;
        },
        setOverflow(state, action: PayloadAction<{ format: string; value: boolean }>) {
            const { format, value } = action.payload;
            state.toolbar[format] = value;
        },
    },
});

export const draftActions = draftSlice.actions;

const draftReducer = draftSlice.reducer;

export default draftReducer;
