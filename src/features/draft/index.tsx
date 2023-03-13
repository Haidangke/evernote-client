import classNames from 'classnames/bind';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor, EditorProvider } from 'draft-js-rte';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { editorActions } from 'features/editor/editorSlice';
import { noteActions } from 'features/note/noteSlice';
import useLocationPage from 'hooks/useLocationPage';
import useOnClickOutside from 'hooks/useOnclickOutside';

import Loading from 'components/Loading';
import { toastError } from 'components/Toast/toast';
import EditorFooter from './components/Footer';
import Toolbar from './components/Toolbar';
import Topbar from './components/Topbar';
import {
    blockRenderMap,
    customStyleMaps,
    getBlockRendererFn,
    keyBindingFn,
    myBlockStyleFn,
} from './config/draft.config';

import 'draft-js-rte/lib/Draft.css';
import 'draft-js/dist/Draft.css';
import styles from './Draft.module.scss';
import './Draft.scss';
const cx = classNames.bind(styles);

function Draft() {
    const dispatch = useAppDispatch();
    const page = useLocationPage();
    const isRecycle = page === 'recycle';

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
            if (!noteContent || !note) return;
            const _raw = convertToRaw(newEditorState.getCurrentContent());
            const content = JSON.stringify(_raw);

            setEditorState(newEditorState);
            dispatch(noteActions.updateNote({ ...note, content }));

            if (
                !newEditorState
                    .getCurrentContent()
                    .getBlockMap()
                    .equals(noteContent.getCurrentContent().getBlockMap())
            ) {
                dispatch(noteActions.update({ id: note._id, params: { content } }));
            }
        },
        [dispatch, noteContent, note]
    );

    const blockRendererFn = getBlockRendererFn(editorState as EditorState, onChange);

    const changeDisable = () => {
        if (isRecycle) {
            toastError('Bạn không thể cập nhật một ghi chú trong thùng rác');
        }
    };

    useEffect(() => {
        setEditorState(noteContent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]);
    useOnClickOutside(editorRef, () => dispatch(editorActions.setIsToolbar(false)));

    return (
        <div className={styles.wrapper}>
            <Topbar />
            {editorState && note ? (
                <div ref={editorRef} className={styles.editor}>
                    <EditorProvider
                        key={note._id}
                        editorState={editorState}
                        onChange={onChange}
                        customStyleMaps={customStyleMaps}
                    >
                        <Toolbar onChange={onChange} editorState={editorState} />

                        <div onDoubleClick={changeDisable} className={cx('editable')}>
                            <input
                                onFocus={() => {
                                    setOnHeader(true);
                                    dispatch(editorActions.setIsToolbar(true));
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
                                    blockStyleFn={myBlockStyleFn}
                                    blockRendererFn={blockRendererFn}
                                    blockRenderMap={blockRenderMap}
                                    keyBindingFn={(e) => keyBindingFn(e, editorState, onChange)}
                                    placeholder='Bắt đầu soạn thảo ghi chú của riêng bạn'
                                />
                            </div>
                        </div>
                    </EditorProvider>
                </div>
            ) : (
                <div className={cx('loading')}>
                    {isFetching && <Loading width='42px' height='42px' />}
                </div>
            )}
            {note && <EditorFooter />}
        </div>
    );
}

export default Draft;
