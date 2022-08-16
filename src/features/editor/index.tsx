import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import pipe from 'lodash/fp/pipe';
import classNames from 'classnames/bind';

import Toolbar from './components/Toolbar';
import SlateTopbar from './components/SlateTopbar';
import SlateFooter from './components/SlateFooter';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import { toolbarActions } from 'features/editor/editorSlice';
import useDecorate from 'hooks/useDecorate';
import useWindowWidth from 'hooks/useWindowWidth';
import useOnClickOutside from 'hooks/useOnclickOutside';

import { withChecklists, withLinks, withKeyCommands, withImages } from './plugins';
import { SlateElement, SlateLeaf } from './slates';
import { LoadingIcon } from 'assets/icons';

import styles from './Editor.module.scss';
const cx = classNames.bind(styles);

const createEditorWithPlugins = pipe(
    withImages,
    withReact,
    withHistory,
    withChecklists,
    withLinks,
    withKeyCommands
);

function Editor() {
    const editorRef = useRef(null);
    const dispatch = useAppDispatch();
    const { listNote, isFetching } = useAppSelector((state) => state.note);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n') || '';
    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    //state
    const [search, setSearch] = useState('');
    const [onHeader, setOnHeader] = useState(false);

    const decorate = useDecorate(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const editor = useMemo(() => createEditorWithPlugins(createEditor()), [noteId]);

    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

    const width = useWindowWidth();

    const setIsToolbar = useCallback(
        (isToolbar: boolean) => {
            dispatch(toolbarActions.setIsToolbar(isToolbar));
        },
        [dispatch]
    );

    useEffect(() => {
        setIsToolbar(false);
    }, [setIsToolbar, width]);

    useOnClickOutside(editorRef, () => dispatch(toolbarActions.setIsToolbar(false)));
    return (
        <div className={styles.wrapper}>
            <SlateTopbar />
            {note ? (
                <div ref={editorRef} className={cx('editor')}>
                    <Slate
                        editor={editor}
                        value={JSON.parse(note.content)}
                        key={noteId}
                        onChange={(e: any) => {
                            const isAstChange = editor.operations.some(
                                (op: any) => 'set_selection' !== op.type
                            );
                            if (isAstChange) {
                                const content = JSON.stringify(e);

                                dispatch(noteActions.update({ id: noteId, params: { content } }));
                                dispatch(noteActions.updateNote({ ...note, content }));
                            }
                        }}
                    >
                        <Toolbar onHeader={onHeader} setSearch={setSearch} />

                        <div className={cx('editable')}>
                            <input
                                onFocus={() => {
                                    setOnHeader(true);
                                    setIsToolbar(true);
                                }}
                                onBlur={() => setOnHeader(false)}
                                type='text'
                                placeholder='Tiêu đề'
                                className={cx('slate-header')}
                                value={note?.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    dispatch(noteActions.updateNote({ ...note, title }));
                                    dispatch(noteActions.update({ id: noteId, params: { title } }));
                                }}
                            />
                            <div className={cx('editable-main')}>
                                <Editable
                                    placeholder='Bắt đầu viết những suy nghĩ, hoặc công việc vào đây'
                                    decorate={decorate}
                                    onClick={() => setIsToolbar(true)}
                                    onFocus={() => {
                                        setIsToolbar(true);
                                        setOnHeader(false);
                                    }}
                                    renderLeaf={renderLeaf}
                                    renderElement={renderElement}
                                />
                            </div>
                        </div>
                    </Slate>
                </div>
            ) : isFetching ? (
                <div className={cx('loading')}>
                    <LoadingIcon className={cx('loading-icon')} />
                </div>
            ) : (
                <></>
            )}
            <SlateFooter />
        </div>
    );
}

export default Editor;
