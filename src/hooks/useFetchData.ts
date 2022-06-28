import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notebookActions } from 'app/slice/notebookSlice';
import { noteActions } from 'app/slice/noteSlice';
import { tagActions } from 'app/slice/tagSlice';

function useFetchData() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) return;
        dispatch(noteActions.fetch());
        dispatch(tagActions.fetch());
        dispatch(notebookActions.fetch());
    }, [dispatch, isLoggedIn]);
}

export default useFetchData;
