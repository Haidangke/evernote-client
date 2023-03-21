import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notebookActions } from 'features/notebook/notebookSlice';
import { noteActions } from 'features/note/noteSlice';
import { tagActions } from 'features/tag/tagSlice';
import { authActions } from 'features/auth/authSlice';

function useFetchData() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(authActions.getUser());
            dispatch(noteActions.fetch());
            dispatch(tagActions.fetch());
            dispatch(notebookActions.fetch());
        }
    }, [dispatch, isLoggedIn]);
}

export default useFetchData;
