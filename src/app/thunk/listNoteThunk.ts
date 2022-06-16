import { createAsyncThunk } from '@reduxjs/toolkit';
import noteService from 'services/noteService';
import { ListParams } from 'types';

export const fetchListNote = createAsyncThunk(
    'listNote/fetchListNote',
    async (params: ListParams, thunkAPI) => {
        try {
            const response = await noteService.getAll(params);
            return response.data;
        } catch (error: any) {
            console.log({ error });
            return thunkAPI.rejectWithValue('');
        }
    }
);
