import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Topbar from './components/Topbar';
import Footer from './components/Footer';

import styles from './NoteEditor.module.scss';
import Editor from './components/Editor';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNote } from 'app/thunk/noteThunk';

function NoteEditor() {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { listNote } = useAppSelector((state) => state.listNote);
    const { note } = useAppSelector((state) => state.note);

    const noteId = searchParams.get('noteId');

    useEffect(() => {
        if (!noteId) return;

        if (listNote.some((note) => note._id === noteId) && noteId !== note?._id) {
            dispatch(fetchNote(noteId));
        }
    }, [noteId, dispatch, listNote, note?._id]);

    return (
        <div className={styles.wrapper}>
            <Topbar />
            <Editor />
            <Footer />
        </div>
    );
}

export default NoteEditor;
