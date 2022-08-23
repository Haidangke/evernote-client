import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Upload {
    isLoading: boolean;
    messeage: string;
}

interface InitialState {
    rectX: number;
    isToolbar: boolean;
    toolbar: Array<{
        isOverflow: boolean;
        format: string;
    }>;

    upload: Upload;
}

const initialState: InitialState = {
    isToolbar: false,
    rectX: 0,
    upload: {
        isLoading: false,
        messeage: '',
    },
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
            format: 'align',
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

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setRectX(state, action: PayloadAction<number>) {
            state.rectX = action.payload;
        },
        setIsToolbar(state, action: PayloadAction<boolean>) {
            state.isToolbar = action.payload;
        },
        setOverflow(state, action: PayloadAction<{ format: string; value: boolean }>) {
            const { format, value } = action.payload;
            const index = state.toolbar.map((x) => x.format).indexOf(format);
            state.toolbar[index].isOverflow = value;
        },
        setUpload(state, action: PayloadAction<Upload>) {
            state.upload = action.payload;
        },
    },
});

export const editorActions = editorSlice.actions;

const editorReducer = editorSlice.reducer;

export default editorReducer;
