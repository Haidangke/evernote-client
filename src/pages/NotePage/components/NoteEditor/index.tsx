import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Topbar from './Topbar';
import Footer from './Footer';

import useOnClickOutside from '~/hooks/useOnclickOutside';

import styles from './NoteEditor.module.scss';
import SlateEditor from './Editor';
import { useAppDispatch } from '~/app/hooks';
import { fetchNote } from '~/app/thunk/noteThunk';
const cx = classNames.bind(styles);

function NoteEditor() {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const [isToolbar, setIsToolbar] = useState(true);

    const editorRef = useRef<any>(null);

    useEffect(() => {
        const noteId = searchParams.get('note');
        if (noteId) {
            dispatch(fetchNote(noteId));
        }
    }, [searchParams, dispatch]);

    useOnClickOutside(editorRef, () => setIsToolbar(false));

    return (
        <div ref={editorRef} className={cx('wrapper')}>
            <Topbar />
            <SlateEditor isToolbar={isToolbar} setIsToolbar={setIsToolbar} />
            <Footer />
        </div>
    );
}

export default NoteEditor;
