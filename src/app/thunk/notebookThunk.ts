import { createAsyncThunk } from '@reduxjs/toolkit';

import notebookService from 'services/notebookService';

export const fetchNotebooks = createAsyncThunk(
    'notebooks/fetchNotebooks',
    async (params: undefined, thunkAPI) => {
        try {
            const response = await notebookService.get();
            return response;
        } catch (error: any) {
            console.log({ error });
            return thunkAPI.rejectWithValue('');
        }
    }
);
