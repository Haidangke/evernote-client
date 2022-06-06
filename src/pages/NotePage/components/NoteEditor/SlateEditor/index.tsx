import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import classNames from 'classnames/bind';

import SlateToolbar from '../SlateToolbar';
import styles from './SlateEditor.module.scss';
import { SlateElement, SlateLeaf } from '../SlateCase';
import { withChecklists } from '../CheckList';
import useDecorate from '~/hooks/useDecorate';
import { withTables } from '../Table';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import useDebounce from '~/hooks/useDebounce';
import { updateNote } from '~/app/thunk/noteThunk';

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

    const slateValueDebounce = useDebounce(slateValue, 700);
    const decorate = useDecorate(search);
    const editorRef = useRef(null);

    const editor = useMemo(
        () => withTables(withChecklists(withHistory(withReact(createEditor())))),
        []
    );

    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

    useEffect(() => {
        const content = JSON.stringify(slateValueDebounce);
        if (content && noteId) {
            dispatch(updateNote({ id: noteId, params: { content, title: heading } }));
        }
    }, [slateValueDebounce, dispatch, noteId, heading]);

    const initialContent = useMemo(
        () => (note?.content ? JSON.parse(note?.content || '') : ''),
        [note?.content]
    );

    return isFetchSuccess && initialContent ? (
        <div ref={editorRef} className={cx('editor')}>
            <Slate
                editor={editor}
                value={initialContent}
                onChange={(value: any) => setSlateValue(value)}
            >
                {isToolbar ? (
                    <SlateToolbar onHeader={onHeader} editor={editor} setSearch={setSearch} />
                ) : (
                    <div className={cx('info-update')}>Chỉnh sửa lần cuối vào 3 thg 6, 2022</div>
                )}
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
                        value={heading || note?.title}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                    <div className={cx('editable-main')}>
                        {(slateValue || initialContent)[0].children[0].text ||
                        (slateValue || initialContent)[0]?.children[0]?.children?.length > 0 ? (
                            <></>
                        ) : (
                            <div className={cx('placeholder')}>
                                Bắt đầu viết những suy nghĩ, hoặc công việc vào đây
                            </div>
                        )}
                        <Editable
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
        <div>Loading</div>
    );
}

export default SlateEditor;
