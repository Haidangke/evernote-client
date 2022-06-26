import { createAsyncThunk } from '@reduxjs/toolkit';
import noteService from 'services/noteService';
import { UpdateNoteParams } from 'types';
import { noteActions } from '../slice/noteSlice';

export const fetchNote = createAsyncThunk('note/fetchNote', async (id: string, thunkAPI) => {
    try {
        const response = await noteService.get(id);
        return response;
    } catch (error: any) {
        console.log({ error });
        return thunkAPI.rejectWithValue('');
    }
});

export const updateNote = createAsyncThunk(
    'note/updateNote',
    async (obj: { id: string; params: UpdateNoteParams }, thunkAPI) => {
        const { id, params } = obj;
        try {
            await noteService.update(id, params);
            thunkAPI.dispatch(noteActions.updateSuccess());
        } catch (error: any) {
            thunkAPI.dispatch(noteActions.updateFailed());
            return thunkAPI.rejectWithValue('');
        }
    }
);
