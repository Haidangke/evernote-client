import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notebookActions } from 'app/slice/notebookSlice';
import { noteActions } from 'app/slice/noteSlice';
import { tagActions } from 'app/slice/tagSlice';
import { authActions } from 'app/slice/authSlice';

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
    }, [dispatch, isLoggedIn, email]);
}

export default useFetchData;
