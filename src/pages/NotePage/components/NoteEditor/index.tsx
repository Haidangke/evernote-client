import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Topbar from './components/Topbar';
import Footer from './components/Footer';

import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './NoteEditor.module.scss';
import Editor from './components/Editor';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNote } from 'app/thunk/noteThunk';
const cx = classNames.bind(styles);

function NoteEditor() {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { listNote } = useAppSelector((state) => state.listNote);

    const [isToolbar, setIsToolbar] = useState(true);

    const editorRef = useRef<any>(null);

    const noteId = searchParams.get('noteId');
    useEffect(() => {
        if (listNote.some((note) => note._id === noteId) && noteId) {
            dispatch(fetchNote(noteId));
        }
    }, [noteId, dispatch, listNote]);

    useOnClickOutside(editorRef, () => setIsToolbar(false));

    return (
        <div ref={editorRef} className={cx('wrapper')}>
            <Topbar />
            <Editor isToolbar={isToolbar} setIsToolbar={setIsToolbar} />
            <Footer />
        </div>
    );
}

export default NoteEditor;
