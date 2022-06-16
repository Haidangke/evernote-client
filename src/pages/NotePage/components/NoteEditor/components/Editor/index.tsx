import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import useDecorate from '~/hooks/useDecorate';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { updateNote } from '~/app/thunk/noteThunk';
import { LoadingIcon } from '~/assets/icons';
import { noteActions } from '~/app/slice/noteSlice';
import useWindowSize from '~/hooks/useWindowSize';
import { listNoteActions } from '~/app/slice/listNoteSlice';

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

interface EditorProps {
    isToolbar: boolean;
    setIsToolbar: any;
}

function SlateEditor({ isToolbar, setIsToolbar }: EditorProps) {
    const dispatch = useAppDispatch();
    const { note, isFetchSuccess } = useAppSelector((state) => state.note);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('noteId') || '';

    //state
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: '',
    });
    const [search, setSearch] = useState('');
    const [onHeader, setOnHeader] = useState(false);

    const decorate = useDecorate(search);
    const editorRef = useRef(null);
    const editor = useMemo(() => createEditorWithPlugins(createEditor()), [noteId]);

    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

    //condition render slate
    const initialContent = useMemo(
        () => (note?.content ? JSON.parse(note?.content || '') : ''),
        [note]
    );

    const condition = useMemo(
        () => isFetchSuccess && initialContent && note?._id === noteId,
        [isFetchSuccess, initialContent, note, noteId]
    );

    //update note
    const changeHandler = (e: any) => {
        const content = JSON.stringify(e);
        if (noteId) {
            dispatch(updateNote({ id: noteId, params: { content } }));
        }
    };

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 700), [noteId]);

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        };
    }, [debouncedChangeHandler, noteId]);

    useEffect(() => {
        if (note?.updatedAt) {
            let new_date = new Date(note?.updatedAt);
            const [day, month, year] = new_date.toLocaleDateString().split('/');
            setDate((prev) => ({ ...prev, day, month, year }));
        }
    }, [note?.updatedAt]);

    const [width] = useWindowSize();

    useEffect(() => setIsToolbar(false), [setIsToolbar, width]);

    return note && condition ? (
        <div ref={editorRef} className={cx('editor')}>
            <Slate
                editor={editor}
                value={initialContent}
                onChange={(e: any) => {
                    const isAstChange = editor.operations.some(
                        (op: any) => 'set_selection' !== op.type
                    );
                    if (isAstChange) {
                        dispatch(noteActions.setIsLoading(true));
                        debouncedChangeHandler(e);
                    }
                }}
            >
                {isToolbar ? (
                    <Toolbar onHeader={onHeader} editor={editor} setSearch={setSearch} />
                ) : (
                    <div className={cx('info-update')}>
                        Chỉnh sửa lần cuối vào {date.day} thg {date.month}, {date.year}
                    </div>
                )}
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
                            dispatch(updateNote({ id: noteId, params: { title } }));
                        }}
                    />
                    <div className={cx('editable-main')}>
                        <Editable
                            placeholder='Bắt đầu viết những suy nghĩ, hoặc công việc vào đây'
                            decorate={decorate}
                            onClick={() => setIsToolbar(true)}
                            onFocus={(e) => {
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

export default SlateEditor;
