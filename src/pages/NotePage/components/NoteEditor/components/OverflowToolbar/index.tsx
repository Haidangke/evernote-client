import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { useSlate } from 'slate-react';

import { useAppSelector } from '~/app/hooks';
import { selectOverflowToolbar } from '~/app/slice/toolbarSlice';
import { ArrowDownIcon } from '~/assets/icons';
import {
    AlignCenterIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    BulletedListIcon,
    IndentIcon,
    ItalicIcon,
    LineThrougnIcon,
    NumberListIcon,
    OutdentIcon,
    SubScriptIcon,
    TestListIcon,
    UnderlineIcon,
    UpperIndexIcon,
} from '~/assets/icons/toolbar';
import { DropdownButton } from '../Button';
import { textIndent } from '../../utils/indent';
import { isMarkActive, toggleMark } from '../../utils/mark';
import { isBlockActive, toggleBlock } from '../../utils/block';

import styles from './OverflowToolbar.module.scss';
const cx = classNames.bind(styles);

const fontStyle = [
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

const listStyle = [
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

const indent = [
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

const align = [
    { icon: AlignLeftIcon, format: 'left', name: 'Căn trái' },
    { icon: AlignCenterIcon, format: 'center', name: 'Căn giữa' },
    { icon: AlignRightIcon, format: 'right', name: 'Căn phải' },
];

const textFormat = [
    { icon: LineThrougnIcon, format: 'through', name: 'Gạch ngang' },
    { icon: UpperIndexIcon, format: 'sup', name: 'Chỉ số trên' },
    { icon: SubScriptIcon, format: 'sub', name: 'Chỉ số dưới' },
];

function OverflowToolbar() {
    const editor = useSlate();
    const overflowToolbar = useAppSelector(selectOverflowToolbar);
    const ifOverflowToolbar = overflowToolbar.filter((item) => item.isOverflow).length > 0;

    const isOverflow = useCallback(
        (format: string) => {
            return overflowToolbar.filter((item) => item.format === format)[0].isOverflow;
        },
        [overflowToolbar]
    );

    if (!ifOverflowToolbar) return <></>;
    return (
        <DropdownButton
            isOther
            dropdown={() => (
                <div className={cx('wrapper')}>
                    <div className={cx('list')}>
                        {fontStyle.map((item) => {
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
                        {fontStyle.filter((item) => isOverflow(item.format)).length > 0 && (
                            <div className={cx('line-through')}>
                                <span></span>
                            </div>
                        )}
                        {listStyle.map((item) => {
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
                        {listStyle.filter((item) => isOverflow(item.format)).length > 0 && (
                            <div className={cx('line-through')}>
                                <span></span>
                            </div>
                        )}
                        {align.map((item) => {
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
                        {indent.map((item) => {
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
                        {indent.filter((item) => isOverflow(item.format)).length > 0 && (
                            <div className={cx('line-through')}>
                                <span></span>
                            </div>
                        )}
                        {textFormat.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.format}
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
            )}
        >
            <span>Khác</span>
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default OverflowToolbar;
