import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { useSlate } from 'slate-react';

import { useAppSelector } from '~/app/hooks';
import { selectOverflowToolbar } from '~/app/slice/toolbarSlice';
import { ArrowDownIcon } from '~/components/Icon';
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
import { DropdownButton } from '../Button';
import { textIndent } from '../../utils/indent';
import { isMarkActive, toggleMark } from '../../utils/mark';
import { isBlockActive, toggleBlock } from '../../utils/block';

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
                        {markToolbar.filter((item) => isOverflow(item.format)).length > 0 && (
                            <div className={cx('line-through')}>
                                <span></span>
                            </div>
                        )}
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
                        {listToolbar.filter((item) => isOverflow(item.format)).length > 0 && (
                            <div className={cx('line-through')}>
                                <span></span>
                            </div>
                        )}
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
            )}
        >
            <span>Khác</span>
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default OverflowToolbar;
