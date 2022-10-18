import classNames from 'classnames/bind';
import pipe from 'lodash/fp/pipe';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { editorActions } from 'features/editor/editorSlice';
import { noteActions } from 'features/note/noteSlice';
import useDecorate from 'hooks/useDecorate';
import useOnClickOutside from 'hooks/useOnclickOutside';
import SlateFooter from './components/SlateFooter';
import SlateTopbar from './components/SlateTopbar';
import Toolbar from './components/Toolbar';

import Loading from 'components/Loading';
import UploadLoading from './components/UploadLoading';
import { withChecklists, withKeyCommands, withLinks, withIndent } from './plugins';
import { SlateElement, SlateLeaf } from './slates';

import styles from './Editor.module.scss';
const cx = classNames.bind(styles);

const createEditorWithPlugins = pipe(
    withReact,
    withHistory,
    withChecklists,
    withLinks,
    withKeyCommands,
    withIndent
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

    const setIsToolbar = useCallback(
        (isToolbar: boolean) => {
            dispatch(editorActions.setIsToolbar(isToolbar));
        },
        [dispatch]
    );

    useOnClickOutside(editorRef, () => dispatch(editorActions.setIsToolbar(false)));

    return (
        <div className={styles.wrapper}>
            <UploadLoading />
            <div className={styles.topbar}>
                <SlateTopbar />
            </div>

            {note ? (
                <div ref={editorRef} className={styles.editor}>
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
                        <div className={styles.toolbar}>
                            <Toolbar onHeader={onHeader} setSearch={setSearch} />
                        </div>

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
                                    // onKeyDown={(event) => handleKeyboard(event, editor)}
                                    renderLeaf={renderLeaf}
                                    renderElement={renderElement}
                                />
                            </div>
                        </div>
                    </Slate>
                </div>
            ) : (
                <div className={cx('loading')}>
                    {isFetching && <Loading width='42px' height='42px' />}
                </div>
            )}
            {note && (
                <div className={styles.footer}>
                    <SlateFooter />
                </div>
            )}
        </div>
    );
}

export default Editor;
