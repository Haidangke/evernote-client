import classNames from 'classnames/bind';
import { HistoryEditor } from 'slate-history';
import {
    BlockButton,
    DropdownButton,
    HandleButton,
    MarkButton,
} from '~/pages/NotePage/components/NoteEditor/ButtonToolbar';
import { ArrowDownIcon } from '~/components/Icon';
import {
    AlignIcon,
    BoldIcon,
    BulletedListIcon,
    CalendarIcon,
    CheckIcon,
    ColorPickerIcon,
    FileIcon,
    IndentIcon,
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
import InsertBtn from '../InsertBtn';
import colorPicker from '~/assets/images/color-picker.png';
import styles from './SlateToolbar.module.scss';
import { useState } from 'react';
import { isBlockActive, toggleBlock } from '../ButtonToolbar/BlockButton';
import { toolbarConfig } from '~/config';
import SearchHightlight from '../SearchHightlight';
import { textIndent } from '../InOutdent';

const cx = classNames.bind(styles);

interface SlateToolbarProps {
    onHeader: boolean;
    editor: any;
    setSearch: any;
}

function SlateToolbar({ onHeader, editor, setSearch }: SlateToolbarProps) {
    const [heading, setHeading] = useState('Văn bản thường');

    const isAlignIconDefault = toolbarConfig.align.filter((item) =>
        isBlockActive(editor, item.value, 'align')
    )[0]?.icon;
    const AlignIconDefault = isAlignIconDefault || AlignIcon;

    const isFontSizeTextDefault = toolbarConfig.fontSize.filter((item) =>
        isBlockActive(editor, item, 'fontSize')
    )[0];

    const FontSizeTextDefault = isFontSizeTextDefault || '16';

    const { history } = editor;
    const { undos, redos } = history;

    return (
        <div className={cx('toolbar', { 'toolbar-on-header': onHeader })}>
            <InsertBtn />

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

            <HandleButton
                disable={undos.length === 0}
                onClick={() => HistoryEditor.undo(editor)}
                content='Hoàn tác'
                className={cx({ btn__disable: undos.length === 0 })}
            >
                <UndoTcon />
            </HandleButton>

            <HandleButton
                disable={redos.length === 0}
                onClick={() => HistoryEditor.undo(editor)}
                content='Làm lại'
                className={cx({ btn__disable: redos.length === 0 })}
            >
                <RedoIcon />
            </HandleButton>

            <div className={cx('line-through')}></div>

            {/* heading */}
            <DropdownButton
                width='120px'
                content='content'
                value={heading}
                dropdown={() => (
                    <div className={cx('dropdown-wrapper')}>
                        {toolbarConfig.heading.map((item) => (
                            <button
                                className={cx('dropdown-heading', {
                                    'dropdown-heading__active': heading === item.name,
                                })}
                                style={{ fontSize: item.size }}
                                key={item.value}
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    toggleBlock(editor, item.value);
                                    setHeading(item.name);
                                }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                )}
            >
                <ArrowDownIcon width={8} height={24} />
            </DropdownButton>

            <div className={cx('line-through')}></div>

            <DropdownButton content='content' dropdown={() => <h1>Drop Down</h1>}>
                <span>Sans Serif</span>
                <ArrowDownIcon width={8} height={24} />
            </DropdownButton>

            <div className={cx('line-through')}></div>

            {/* font size */}
            <DropdownButton
                content='content'
                dropdown={() => (
                    <div className={cx('dropdown-wrapper')}>
                        {toolbarConfig.fontSize.map((item) => (
                            <button
                                key={item}
                                className={cx('dropdown-align')}
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    toggleBlock(editor, item);
                                }}
                            >
                                <div className={cx('dropdown-align-check')}>
                                    {(isBlockActive(editor, item, 'fontSize') ||
                                        (!isFontSizeTextDefault && item === '16px')) && (
                                        <CheckIcon />
                                    )}
                                </div>
                                {item.replace('px', '')}
                            </button>
                        ))}
                    </div>
                )}
            >
                <span>{FontSizeTextDefault.replace('px', '')}</span>
                <ArrowDownIcon width={8} height={24} />
            </DropdownButton>

            <div className={cx('line-through')}></div>

            {/* color picker */}
            <DropdownButton
                content='content'
                dropdown={() => (
                    <div className={cx('color-wrapper')}>
                        {toolbarConfig.color.map((item) => (
                            <button
                                key={item}
                                className={cx('color-btn', {
                                    'color-btn-light': item === 'rgb(255, 255, 255)',
                                    'color-btn-active': isBlockActive(editor, item, 'color'),
                                })}
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    toggleBlock(editor, item);
                                }}
                            >
                                <span style={{ backgroundColor: item }}></span>
                            </button>
                        ))}
                    </div>
                )}
            >
                <div className={cx('color-picker')}>
                    <img src={colorPicker} alt='color picker' />
                    <ColorPickerIcon />
                </div>

                <ArrowDownIcon width={8} height={24} />
            </DropdownButton>

            {/* B I U */}
            <MarkButton content='Đậm' format='bold'>
                <BoldIcon />
            </MarkButton>

            <MarkButton content='Nghiêng' format='italic'>
                <ItalicIcon />
            </MarkButton>

            <MarkButton content='Gạch dưới' format='underline'>
                <UnderlineIcon />
            </MarkButton>

            <div className={cx('line-through')}></div>

            {/* List */}
            <BlockButton content='Danh sách dấu đầu dòng' format='bulleted-list'>
                <BulletedListIcon />
            </BlockButton>
            <BlockButton content='Danh sách đánh số' format='numbered-list'>
                <NumberListIcon />
            </BlockButton>
            <BlockButton content='Danh sách kiểm tra' format='check-list-item'>
                <TestListIcon />
            </BlockButton>

            <HandleButton onClick={() => console.log('Handle')} content='Sự kiện trên lịch'>
                <LinkIcon />
            </HandleButton>
            <div className={cx('line-through')}></div>

            {/* align */}
            <DropdownButton
                content='content'
                dropdown={() => (
                    <div className={cx('dropdown-wrapper')}>
                        {toolbarConfig.align.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    className={cx('dropdown-align')}
                                    key={item.value}
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        toggleBlock(editor, item.value);
                                    }}
                                >
                                    <div className={cx('dropdown-align-check')}>
                                        {(isBlockActive(editor, item.value, 'align') ||
                                            (!isAlignIconDefault && item.value === 'left')) && (
                                            <CheckIcon />
                                        )}
                                    </div>

                                    <Icon className={cx('dropdown-align-icon')} />
                                </button>
                            );
                        })}
                    </div>
                )}
            >
                <AlignIconDefault />
                <ArrowDownIcon width={8} height={24} />
            </DropdownButton>

            {/* indent outdent */}
            <HandleButton content='Indent' onClick={() => textIndent(editor, 'indent')}>
                <IndentIcon />
            </HandleButton>
            <HandleButton content='Outdent' onClick={() => textIndent(editor, 'outdent')}>
                <OutdentIcon />
            </HandleButton>

            <div className={cx('line-through')}></div>
            <MarkButton content='gạch dưới' format='underline'>
                <LineThrougnIcon />
            </MarkButton>
            <BlockButton content='' format='x'>
                <UpperIndexIcon />
            </BlockButton>

            <BlockButton content='' format='y'>
                <SubScriptIcon />
            </BlockButton>

            <SearchHightlight setSearch={setSearch} />
        </div>
    );
}

export default SlateToolbar;
