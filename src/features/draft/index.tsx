import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { editorActions } from 'features/editor/editorSlice';
import { noteActions } from 'features/note/noteSlice';

import { WarningIcon } from 'components/Icons';
import Loading from 'components/Loading';
import Toast from 'components/Toast';
import useLocationPage from 'hooks/useLocationPage';
import useOnClickOutside from 'hooks/useOnclickOutside';
import Toolbar from './components/Toolbar';

import styles from './Draft.module.scss';
import './Draft.scss';
const cx = classNames.bind(styles);

const styleMap = {
    SANSSERIF: {
        fontFamily: '"Source Sans Pro", sans-serif',
    },
};

function Draft() {
    const dispatch = useAppDispatch();
    const page = useLocationPage();
    const editorRef = useRef(null);
    const [onHeader, setOnHeader] = useState(false);
    const { listNote, isFetching } = useAppSelector((state) => state.note);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n') || '';
    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    const noteContent = useMemo(() => {
        if (!note) return null;
        const rawContentFromStore = convertFromRaw(JSON.parse(note.content));
        return EditorState.createWithContent(rawContentFromStore);
    }, [note]);

    const [editorState, setEditorState] = useState(noteContent);

    const onChange = useCallback(
        (newEditorState: EditorState) => {
            if (!note) return;
            const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
            if (newEditorState !== noteContent) {
                setEditorState(newEditorState);
                dispatch(noteActions.update({ id: note._id, params: { content } }));
                dispatch(noteActions.updateNote({ ...note, content }));
            }
        },
        [dispatch, noteContent, note]
    );

    //state

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const setIsToolbar = useCallback(
        (isToolbar: boolean) => {
            dispatch(editorActions.setIsToolbar(isToolbar));
        },
        [dispatch]
    );

    const handleChangeDisable = () => {
        if (!(page === 'recycle')) return;
        toast.remove();
        toast((t) => (
            <Toast type='error' toastId={t.id}>
                <span className={styles.toast}>
                    <WarningIcon />
                    Bạn không thể cập nhật một ghi chú trong thùng rác
                </span>
            </Toast>
        ));
    };

    useEffect(() => {
        setEditorState(noteContent);
    }, [noteId]);

    useOnClickOutside(editorRef, () => dispatch(editorActions.setIsToolbar(false)));

    return (
        <div className={styles.wrapper}>
            <div className={styles.topbar}>{/* <SlateTopbar /> */}</div>

            {editorState && note ? (
                <div ref={editorRef} className={styles.editor}>
                    <div className={styles.toolbar}>
                        <Toolbar onChange={onChange} editorState={editorState} />
                    </div>

                    <div onDoubleClick={handleChangeDisable} className={cx('editable')}>
                        <input
                            onFocus={() => {
                                setOnHeader(true);
                                setIsToolbar(true);
                            }}
                            onBlur={() => setOnHeader(false)}
                            type='text'
                            placeholder='Tiêu đề'
                            className={cx('slate-header', {
                                'input--disable': page === 'recycle',
                            })}
                            value={note.title}
                            onChange={(e) => {
                                if (page === 'recycle') return;
                                const title = e.target.value;
                                dispatch(noteActions.updateNote({ ...note, title }));
                                dispatch(noteActions.update({ id: noteId, params: { title } }));
                            }}
                        />
                        <div
                            className={cx('editable-main', {
                                'input--disable': page === 'recycle',
                            })}
                        >
                            <Editor
                                key={note._id}
                                placeholder='Bắt đầu soạn thảo ghi chú của riêng bạn'
                                editorState={editorState}
                                onChange={onChange}
                                customStyleMap={styleMap}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('loading')}>
                    {isFetching && <Loading width='42px' height='42px' />}
                </div>
            )}
            {note && <div className={styles.footer}>{/* <SlateFooter /> */}</div>}
        </div>
    );
}

export default Draft;
