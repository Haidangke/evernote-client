import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Topbar from './Topbar';
import Footer from './Footer';

import useOnClickOutside from '~/hooks/useOnclickOutside';

import styles from './NoteEditor.module.scss';
import SlateEditor from './SlateEditor';
import { useAppDispatch } from '~/app/hooks';
import { fetchNote } from '~/app/thunk/noteThunk';
const cx = classNames.bind(styles);

function NoteEditor() {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [isToolbar, setIsToolbar] = useState(false);

    const editorRef = useRef(null);

    useOnClickOutside(editorRef, () => setIsToolbar(false));

    useEffect(() => {
        const noteId = searchParams.get('note');
        if (noteId) {
            dispatch(fetchNote(noteId));
        }
    }, [searchParams, dispatch]);
    return (
        <div ref={editorRef} className={cx('wrapper')}>
            <Topbar />
            <SlateEditor isToolbar={isToolbar} setIsToolbar={setIsToolbar} />
            <Footer />
        </div>
    );
}

export default NoteEditor;
