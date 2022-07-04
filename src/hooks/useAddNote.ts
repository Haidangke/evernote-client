import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import noteService from 'services/noteService';
import { noteActions } from 'app/slice/noteSlice';

function useAddNote(notebook?: string) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { notebooks } = useAppSelector((state) => state.notebook);

    const addNote = () => {
        const notebookDf = notebooks.find((notebook) => notebook.isDefault);
        const notebookId = notebook || notebookDf?._id;

        if (notebookId) {
            noteService
                .create(notebookId)

                .then((res) => {
                    if (!res) return;
                    dispatch(noteActions.addNote(res));
                    navigate({
                        pathname: '/note',
                        search: '?noteId=' + res._id,
                    });
                })
                .catch();
        }
    };

    return addNote;
}

export default useAddNote;
