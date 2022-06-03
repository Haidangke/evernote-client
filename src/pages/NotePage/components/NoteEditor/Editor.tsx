import classNames from 'classnames/bind';
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import { SlateElement, SlateLeaf } from './Component';
import styles from './NoteEditor.module.scss';
import {
    BlockButton,
    DropDownButton,
    HandleButton,
    MarkButton,
} from '~/components/Button/ButtonToolbar';
import colorPicker from '~/assets/images/color-picker.png';
import {
    AlignIcon,
    BoldIcon,
    BulletedListIcon,
    CalendarIcon,
    ColorPickerIcon,
    FileIcon,
    IndentIcon,
    InsertIcon,
    ItalicIcon,
    LineThrougnIcon,
    LinkIcon,
    NumberListIcon,
    OutdentIcon,
    RedoIcon,
    SubScriptIcon,
    TestListIcon,
    TodoIcon,
    UnderlineIcon,
    UndoTcon,
    UpperIndexIcon,
} from '~/components/Icon/Toolbar';
import { ArrowDownIcon } from '~/components/Icon';
const cx = classNames.bind(styles);

function Editor() {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [{ text: 'This is editable ' }],
        },
    ];

    const [slateValue, setSlateValue] = useState(initialValue);
    const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
    const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);
    return (
        <div className={cx('editor')}>
            <Slate
                editor={editor}
                value={slateValue}
                onChange={(value: any) => {
                    setSlateValue(value);
                }}
            >
                <div className={cx('toolbar')}>
                    <DropDownButton
                        className={cx('insert-btn')}
                        content='content'
                        dropdown={() => <h1>Drop Down</h1>}
                    >
                        <InsertIcon />
                        <span>Chèn</span>
                        <ArrowDownIcon width={8} height={24} />
                    </DropDownButton>

                    <HandleButton onClick={() => console.log('Handle')} content='Tệp đính kèm'>
                        <FileIcon />
                    </HandleButton>
                    <HandleButton onClick={() => console.log('Handle')} content='Nhiệm vụ'>
                        <TodoIcon />
                    </HandleButton>
                    <HandleButton onClick={() => console.log('Handle')} content='Sự kiện trên lịch'>
                        <CalendarIcon />
                    </HandleButton>
                    <div className={cx('line-through')}></div>
                    <HandleButton onClick={() => console.log('Handle')} content='Sự kiện trên lịch'>
                        <UndoTcon />
                    </HandleButton>
                    <HandleButton onClick={() => console.log('Handle')} content='Sự kiện trên lịch'>
                        <RedoIcon />
                    </HandleButton>
                    <div className={cx('line-through')}></div>

                    <DropDownButton content='content' dropdown={() => <h1>Drop Down</h1>}>
                        <span>Văn bản thường</span>
                        <ArrowDownIcon width={8} height={24} />
                    </DropDownButton>

                    <DropDownButton content='content' dropdown={() => <h1>Drop Down</h1>}>
                        <span>Sans Serif</span>
                        <ArrowDownIcon width={8} height={24} />
                    </DropDownButton>

                    <DropDownButton content='content' dropdown={() => <h1>Drop Down</h1>}>
                        <span>16</span>
                        <ArrowDownIcon width={8} height={24} />
                    </DropDownButton>

                    <DropDownButton content='content' dropdown={() => <h1>Drop Down</h1>}>
                        <div className={cx('color-picker')}>
                            <img src={colorPicker} alt='color picker' />
                            <ColorPickerIcon />
                        </div>

                        <ArrowDownIcon width={8} height={24} />
                    </DropDownButton>

                    <MarkButton content='Đậm' format='bold'>
                        <BoldIcon />
                    </MarkButton>
                    <MarkButton content='Nghiêng' format='italic'>
                        <ItalicIcon />
                    </MarkButton>
                    <MarkButton content='gạch dưới' format='underline'>
                        <UnderlineIcon />
                    </MarkButton>
                    <div className={cx('line-through')}></div>
                    <MarkButton content='gạch dưới' format='underline'>
                        <BulletedListIcon />
                    </MarkButton>
                    <MarkButton content='gạch dưới' format='underline'>
                        <NumberListIcon />
                    </MarkButton>
                    <MarkButton content='gạch dưới' format='underline'>
                        <TestListIcon />
                    </MarkButton>
                    <HandleButton onClick={() => console.log('Handle')} content='Sự kiện trên lịch'>
                        <LinkIcon />
                    </HandleButton>
                    <div className={cx('line-through')}></div>
                    <div className={cx('line-through')}></div>
                    <DropDownButton content='content' dropdown={() => <h1>Drop Down</h1>}>
                        <AlignIcon />
                        <ArrowDownIcon width={8} height={24} />
                    </DropDownButton>
                    <BlockButton content='' format=''>
                        <IndentIcon />
                    </BlockButton>
                    <BlockButton content='' format=''>
                        <OutdentIcon />
                    </BlockButton>
                    <div className={cx('line-through')}></div>
                    <MarkButton content='gạch dưới' format='underline'>
                        <LineThrougnIcon />
                    </MarkButton>
                    <BlockButton content='' format=''>
                        <UpperIndexIcon />
                    </BlockButton>
                    <BlockButton content='' format=''>
                        <SubScriptIcon />
                    </BlockButton>
                </div>

                <Editable
                    className={cx('editable')}
                    renderLeaf={renderLeaf}
                    placeholder={'Placeholder'}
                    renderElement={renderElement}
                />
            </Slate>
        </div>
    );
}

export default Editor;
