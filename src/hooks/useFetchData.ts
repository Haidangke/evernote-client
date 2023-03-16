import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notebookActions } from 'features/notebook/notebookSlice';
import { noteActions } from 'features/note/noteSlice';
import { tagActions } from 'features/tag/tagSlice';
import { authActions } from 'features/auth/authSlice';

function useFetchData() {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authActions.getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(noteActions.fetch());
            dispatch(tagActions.fetch());
            dispatch(notebookActions.fetch());
        }
    }, [dispatch, user]);
}

export default useFetchData;
