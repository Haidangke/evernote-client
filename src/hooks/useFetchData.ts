import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notebookActions } from 'features/notebook/notebookSlice';
import { noteActions } from 'features/note/noteSlice';
import { tagActions } from 'features/tag/tagSlice';
import { authActions } from 'features/auth/authSlice';
import { shortcutActions } from 'features/shortcut/shortcutSlice';

function useFetchData() {
    
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const email = useAppSelector((state) => state.auth.user?.email);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) return;
        dispatch(authActions.getUser());
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn && !email) return;
        dispatch(noteActions.fetch());
        dispatch(tagActions.fetch());
        dispatch(notebookActions.fetch());
        dispatch(shortcutActions.fetch());
    }, [dispatch, isLoggedIn, email]);
}

export default useFetchData;
