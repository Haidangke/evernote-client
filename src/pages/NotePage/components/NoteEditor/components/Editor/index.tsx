import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { DebounceInput } from 'react-debounce-input';
import { debounce } from 'lodash';
import pipe from 'lodash/fp/pipe';
import classNames from 'classnames/bind';

import Toolbar from '../Toolbar';
import styles from './Editor.module.scss';
import useDecorate from 'hooks/useDecorate';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateNote } from 'app/thunk/noteThunk';
import { LoadingIcon } from 'assets/icons';
import { noteActions } from 'app/slice/noteSlice';
import useWindowSize from 'hooks/useWindowSize';
import { listNoteActions } from 'app/slice/listNoteSlice';

import { withChecklists, withLinks, withKeyCommands } from '../../plugins';
import { SlateElement, SlateLeaf } from '../../elements';

const createEditorWithPlugins = pipe(
    withReact,
    withHistory,
    withChecklists,
    withLinks,
    withKeyCommands
);

const cx = classNames.bind(styles);

function Editor() {
    const dispatch = useAppDispatch();
    const { listNote } = useAppSelector((state) => state.listNote);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('noteId') || '';
    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    //state
    const [isToolbar, setIsToolbar] = useState(false);
    const [search, setSearch] = useState('');
    const [onHeader, setOnHeader] = useState(false);

    const decorate = useDecorate(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const editor = useMemo(() => createEditorWithPlugins(createEditor()), [noteId]);

    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

    //update note
    const changeHandler = useCallback(
        (e: any) => {
            if (noteId && note) {
                const content = JSON.stringify(e);
                // dispatch(updateNote({ id: noteId, params: { content } }));

                dispatch(noteActions.update({ id: noteId, params: { content } }));
                dispatch(listNoteActions.updateNote({ ...note, content }));
            }
        },
        [dispatch, note, noteId]
    );

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 700), [changeHandler]);

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        };
    }, [debouncedChangeHandler, noteId]);

    const [width] = useWindowSize();

    useEffect(() => setIsToolbar(false), [setIsToolbar, width]);
    return note ? (
        <div className={cx('editor')}>
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
                        // dispatch(updateNote({ id: noteId, params: { content } }));

                        dispatch(noteActions.update({ id: noteId, params: { content } }));
                        // debouncedChangeHandler(e);
                    }
                }}
            >
                <Toolbar isToolbar={isToolbar} onHeader={onHeader} setSearch={setSearch} />

                <div className={cx('editable')}>
                    <DebounceInput
                        onFocus={() => {
                            setOnHeader(true);
                            setIsToolbar(true);
                        }}
                        debounceTimeout={1000}
                        onBlur={() => setOnHeader(false)}
                        type='text'
                        placeholder='Tiêu đề'
                        className={cx('slate-header')}
                        value={note?.title}
                        onChange={(e) => {
                            const title = e.target.value;
                            dispatch(listNoteActions.updateNote({ ...note, title }));
                            // dispatch(updateNote({ id: noteId, params: { title } }));
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
    ) : (
        <div className={cx('loading')}>
            <LoadingIcon className={cx('loading-icon')} />
        </div>
    );
}

export default Editor;
