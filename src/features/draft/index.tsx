import classNames from 'classnames/bind';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor, EditorProvider } from 'draft-js-rte';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import useLocationPage from 'hooks/useLocationPage';
import useOnClickOutside from 'hooks/useOnclickOutside';
import { draftActions } from './draftSlice';

import Loading from 'components/Loading';
import { toastError } from 'components/Toast/toast';
import EditorFooter from './components/Footer';
import Toolbar from './components/Toolbar';
import Topbar from './components/Topbar';
import { Note, Tag } from 'types';
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

function DraftWrapper() {
    const { listNote, isFetching } = useAppSelector((state) => state.note);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n') || '';
    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    if (isFetching) {
        return <div className={cx('loading')}>{<Loading width='42px' height='42px' />}</div>;
    } else {
        return note ? <Draft note={note} /> : null;
    }
}

function Draft({ note }: { note: Note<Tag> }) {
    const noteId = note._id;
    const dispatch = useAppDispatch();
    const page = useLocationPage();

    const editorRef = useRef(null);
    const [onHeader, setOnHeader] = useState(false);
    const [isToolbar, setIsToolbar] = useState(false);
    // const isToolbar = useAppSelector((state) => state.draft.isToolbar);

    const noteContent = useMemo(() => {
        const rawContentFromStore = convertFromRaw(JSON.parse(note.content));
        return EditorState.createWithContent(rawContentFromStore);
    }, [note]);

    const [editorState, setEditorState] = useState<EditorState>(() =>
        EditorState.createWithContent(convertFromRaw(JSON.parse(note.content)))
    );

    const onChange = useCallback(
        (newEditorState: EditorState) => {
            const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
            setEditorState(newEditorState);

            if (
                !newEditorState
                    .getCurrentContent()
                    .getBlockMap()
                    .equals(noteContent.getCurrentContent().getBlockMap())
            ) {
                dispatch(noteActions.updateNote({ ...note, content }));
                dispatch(noteActions.update({ id: note._id, params: { content } }));
            }
        },
        [dispatch, note, noteContent]
    );

    const blockRendererFn = getBlockRendererFn(editorState, onChange);

    const changeDisable = () => {
        if (page === 'recycle') {
            toastError('Bạn không thể cập nhật một ghi chú trong thùng rác');
        }
    };

    useEffect(() => {
        setEditorState(noteContent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]);
    useOnClickOutside(editorRef, () => setIsToolbar(false));

    return (
        <div className={styles.wrapper}>
            <Topbar />

            <div ref={editorRef} className={styles.editor}>
                <EditorProvider
                    key={note._id}
                    editorState={editorState}
                    onChange={onChange}
                    customStyleMaps={customStyleMaps}
                >
                    <Toolbar
                        onHeader={onHeader}
                        isToolbar={isToolbar}
                        onChange={onChange}
                        editorState={editorState}
                    />

                    <div onDoubleClick={changeDisable} className={cx('editable')}>
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
                                onFocus={() => setIsToolbar(true)}
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

            <EditorFooter />
        </div>
    );
}

export default DraftWrapper;
