import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { useSlate } from 'slate-react';
import { useAppSelector } from '~/app/hooks';
import { SelectOverflowToolbar } from '~/app/slice/toolbarSlice';
import {
    AlignCenterIcon,
    AlignIcon,
    AlignRightIcon,
    BoldIcon,
    BulletedListIcon,
    IndentIcon,
    ItalicIcon,
    NumberListIcon,
    OutdentIcon,
    TestListIcon,
    UnderlineIcon,
} from '~/components/Icon/Toolbar';
import { isBlockActive, toggleBlock } from '../Button/BlockButton';
import { isMarkActive, toggleMark } from '../Button/MarkButton';
import { textIndent } from '../Indent';
import styles from './OverflowToolbar.module.scss';

const cx = classNames.bind(styles);

const markToolbar = [
    {
        icon: BoldIcon,
        format: 'bold',
        name: 'Đậm',
    },
    {
        icon: ItalicIcon,
        format: 'italic',
        name: 'Nghiêng',
    },
    {
        icon: UnderlineIcon,
        format: 'underline',
        name: 'Gạch dưới',
    },
];

const listToolbar = [
    {
        icon: BulletedListIcon,
        format: 'bulleted-list',
        name: 'Danh sách dấu đầu dòng',
    },
    {
        icon: NumberListIcon,
        format: 'numbered-list',
        name: 'Danh sách đánh số',
    },
    {
        icon: TestListIcon,
        format: 'check-list-item',
        name: 'Danh sách kiểm tra',
    },
];

const handleToolbar = [
    {
        icon: IndentIcon,
        format: 'indent',
        name: 'Indent',
        handle: (editor: any) => textIndent(editor, 'indent'),
    },
    {
        icon: OutdentIcon,
        format: 'outdent',
        name: 'Outdent',
        handle: (editor: any) => textIndent(editor, 'outdent'),
    },
];

const dropdownToolbar = [
    { icon: AlignIcon, format: 'left', name: 'Căn trái' },
    { icon: AlignCenterIcon, format: 'center', name: 'Căn giữa' },
    { icon: AlignRightIcon, format: 'right', name: 'Căn phải' },
];

function OverflowToolbar() {
    const editor = useSlate();
    const selectOverflowToolbar = useAppSelector(SelectOverflowToolbar);

    const isOverflow = useCallback(
        (format: string) => {
            return selectOverflowToolbar.filter((item) => item.format === format)[0].isOverflow;
        },
        [selectOverflowToolbar]
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                {markToolbar.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.format}
                            onClick={() => toggleMark(editor, item.format)}
                            className={cx('item', {
                                item__active: isMarkActive(editor, item.format),
                                item__hide: !isOverflow(item.format),
                            })}
                        >
                            <span className={cx('icon')}>
                                <Icon width={24} height={24} />
                            </span>
                            <span className={cx('name')}>{item.name}</span>
                        </div>
                    );
                })}
                <div className={cx('line-through')}>
                    <span></span>
                </div>
                {listToolbar.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.format}
                            onClick={() => toggleBlock(editor, item.format)}
                            className={cx('item', {
                                item__active: isBlockActive(editor, item.format),
                                item__hide: !isOverflow(item.format),
                            })}
                        >
                            <span className={cx('icon')}>
                                <Icon width={24} height={24} />
                            </span>
                            <span className={cx('name')}>{item.name}</span>
                        </div>
                    );
                })}
                <div className={cx('line-through')}>
                    <span></span>
                </div>
                {dropdownToolbar.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.format}
                            onClick={() => toggleBlock(editor, item.format)}
                            className={cx('item', {
                                item__active: isBlockActive(editor, item.format, 'align'),
                                item__hide: !isOverflow(item.format),
                            })}
                        >
                            <span className={cx('icon')}>
                                <Icon width={24} height={24} />
                            </span>
                            <span className={cx('name')}>{item.name}</span>
                        </div>
                    );
                })}
                {handleToolbar.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.format}
                            onClick={() => item.handle(editor)}
                            className={cx('item', {
                                item__hide: !isOverflow(item.format),
                            })}
                        >
                            <span className={cx('icon')}>
                                <Icon width={24} height={24} />
                            </span>
                            <span className={cx('name')}>{item.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OverflowToolbar;
