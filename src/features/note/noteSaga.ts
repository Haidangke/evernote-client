import { PayloadAction } from '@reduxjs/toolkit';
import { noteActions } from 'features/note/noteSlice';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';

import noteService from 'services/noteService';
import { Note, Tag, UpdateNoteParams } from 'types';

function* notesSaga() {
    yield all([fetchListNote(), updateNote()]);
}

function* updateNote() {
    try {
        yield debounce(
            700,
            noteActions.update.type,
            function* (action: PayloadAction<{ id: string; params: UpdateNoteParams }>) {
                const { id, params } = action.payload;
                yield call(noteService.update, id, params);
                yield put(noteActions.updateSuccess());
            }
        );
        yield takeLatest(noteActions.fetch.type, fetchListNote);
    } catch (error) {
        yield put(noteActions.updateFailed());
    }
}

function* fetchListNote() {
    yield takeLatest(noteActions.fetch.type, function* () {
        try {
            const response: Note<Tag>[] = yield call(noteService.getAll);
            yield put(noteActions.fetchSuccess(response));
        } catch (error) {
            yield put(noteActions.fetchFailed());
        }
    });
}

export default notesSaga;
