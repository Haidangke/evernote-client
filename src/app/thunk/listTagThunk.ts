import { createAsyncThunk } from '@reduxjs/toolkit';
import tagService from 'services/tagService';

export const fetchListTag = createAsyncThunk('listTag/fetchListTag', async (params, thunkAPI) => {
    try {
        const response = await tagService.get();
        return response.data;
    } catch (error: any) {
        console.log({ error });
        return thunkAPI.rejectWithValue('');
    }
});
