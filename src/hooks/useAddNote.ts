import { noteActions } from 'features/note/noteSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import noteService from 'services/noteService';
import useNavigateParams from './useNavigateParams';

function useAddNote(notebookId?: string) {
    const dispatch = useAppDispatch();
    const navigate = useNavigateParams();
    const { notebooks } = useAppSelector((state) => state.notebook);
    const { listNote } = useAppSelector((state) => state.note);

    const addNote = () => {
        const notebookDf = notebooks.find((notebook) => notebook.isDefault);
        const notebook = notebookId || notebookDf?._id;

        if (notebook) {
            noteService
                .create(notebook)

                .then((res) => {
                    if (!res) return;

                    dispatch(noteActions.setListNote([res, ...listNote]));
                    navigate('/note', { n: res._id });
                })
                .catch();
        }
    };

    return addNote;
}

export default useAddNote;
