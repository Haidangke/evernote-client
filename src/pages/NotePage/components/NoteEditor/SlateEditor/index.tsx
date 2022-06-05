import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import classNames from 'classnames/bind';

import SlateToolbar from '../SlateToolbar';
import styles from './SlateEditor.module.scss';
import { SlateElement, SlateLeaf } from '../SlateCase';
import { withChecklists } from '../CheckList';

const cx = classNames.bind(styles);

interface EditorProps {
    isToolbar: boolean;
    setIsToolbar: any;
}

function SlateEditor({ isToolbar, setIsToolbar }: EditorProps) {
    const editor = useMemo(() => withChecklists(withHistory(withReact(createEditor()))), []);
    const initialValue: any[] = [
        {
            children: [{ text: '' }],
        },
    ];

    const [slateValue, setSlateValue] = useState(initialValue);
    const [onHeader, setOnHeader] = useState(false);

    const editorRef = useRef(null);

    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);

    return (
        <div ref={editorRef} className={cx('editor')}>
            <Slate
                editor={editor}
                value={slateValue}
                onChange={(value: any) => {
                    setSlateValue(value);
                }}
            >
                {isToolbar ? (
                    <SlateToolbar onHeader={onHeader} editor={editor} />
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
                    />
                    <div className={cx('editable-main')}>
                        {slateValue[0].children[0].text ||
                        slateValue[0]?.children[0]?.children?.length > 0 ? (
                            <></>
                        ) : (
                            <div className={cx('placeholder')}>
                                Bắt đầu viết những suy nghĩ, hoặc công việc vào đây
                            </div>
                        )}
                        <Editable
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
    );
}

export default SlateEditor;
