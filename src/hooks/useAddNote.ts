import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listNoteActions } from 'app/slice/listNoteSlice';
import noteService from 'services/noteService';

function useAddNote() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { notebooks } = useAppSelector((state) => state.notebook);

    const addNote = () => {
        const notebookDf = notebooks.find((notebook) => notebook.isDefault);
        if (notebookDf?._id) {
            noteService
                .create(notebookDf._id)
                .then(() => {
                    return noteService.getAll();
                })
                .then((res) => {
                    if (!res) return;
                    dispatch(listNoteActions.setListNote(res));
                    navigate({
                        pathname: '/note',
                        search: '?noteId=' + res[0]._id,
                    });
                })
                .catch();
        }
    };

    return addNote;
}

export default useAddNote;
