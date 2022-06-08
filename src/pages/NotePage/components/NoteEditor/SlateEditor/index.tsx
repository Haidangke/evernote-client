/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { DebounceInput } from 'react-debounce-input';
import { debounce } from 'lodash';
import classNames from 'classnames/bind';

import SlateToolbar from '../SlateToolbar';
import styles from './SlateEditor.module.scss';
import { SlateElement, SlateLeaf } from '../SlateCase';
import { withChecklists } from '../CheckList';
import useDecorate from '~/hooks/useDecorate';
import { withTables } from '../Table';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { updateNote } from '~/app/thunk/noteThunk';
import { LoadingIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

interface EditorProps {
    isToolbar: boolean;
    setIsToolbar: any;
}

function SlateEditor({ isToolbar, setIsToolbar }: EditorProps) {
    const dispatch = useAppDispatch();
    const { note, isFetchSuccess } = useAppSelector((state) => state.note);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('note') || '';

    //state
    const [heading, setHeading] = useState('');
    const [search, setSearch] = useState('');
    const [onHeader, setOnHeader] = useState(false);
    const [slateValue, setSlateValue] = useState(undefined);

    const decorate = useDecorate(search);
    const editorRef = useRef(null);
    const editor = useMemo(
        () => withTables(withChecklists(withHistory(withReact(createEditor())))),
        [noteId]
    );

    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

    //condition render slate
    const initialContent = useMemo(
        () => (note?.content ? JSON.parse(note?.content || '') : ''),
        [note?.content]
    );

    const condition = useMemo(
        () => isFetchSuccess && initialContent && note?._id === noteId,
        [isFetchSuccess, initialContent, note?._id, noteId]
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

    return condition ? (
        <div ref={editorRef} className={cx('editor')}>
            <Slate
                editor={editor}
                value={initialContent}
                onChange={(e: any) => {
                    setSlateValue(e);
                    debouncedChangeHandler(e);
                }}
            >
                {isToolbar ? (
                    <SlateToolbar onHeader={onHeader} editor={editor} setSearch={setSearch} />
                ) : (
                    <div className={cx('info-update')}>Chỉnh sửa lần cuối vào 3 thg 6, 2022</div>
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
                            dispatch(updateNote({ id: noteId, params: { title: e.target.value } }));
                            console.log('debounce');
                        }}
                    />
                    <div className={cx('editable-main')}>
                        {(slateValue || initialContent)[0]?.children[0].text ||
                        (slateValue || initialContent)[0]?.children[0]?.children?.length > 0 ? (
                            <></>
                        ) : (
                            <div className={cx('placeholder')}>
                                Bắt đầu viết những suy nghĩ, hoặc công việc vào đây
                            </div>
                        )}
                        <Editable
                            contentEditable={false}
                            decorate={decorate}
                            spellCheck
                            autoFocus
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

export default SlateEditor;
