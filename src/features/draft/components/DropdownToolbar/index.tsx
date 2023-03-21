import { useState } from 'react';
import classNames from 'classnames/bind';

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
    TestListIcon,
    UnderlineIcon,
} from 'components/Icons';
import DropdownToolbarItem from './DropdownToolbarItem';
import { DropdownButton } from '../Button';

import styles from './DropdownToolbar.module.scss';
const cx = classNames.bind(styles);

const tools = [
    {
        icon: BoldIcon,
        format: 'BOLD',
        name: 'Đậm',
    },
    {
        icon: ItalicIcon,
        format: 'ITALIC',
        name: 'Nghiêng',
    },
    {
        icon: UnderlineIcon,
        format: 'UNDERLINE',
        name: 'Gạch dưới',
    },
    undefined,
    {
        icon: BulletedListIcon,
        format: 'unordered-list-item',
        name: 'Danh sách dấu đầu dòng',
    },
    {
        icon: NumberListIcon,
        format: 'ordered-list-item',
        name: 'Danh sách đánh số',
    },
    {
        icon: TestListIcon,
        format: 'check-list-item',
        name: 'Danh sách kiểm tra',
    },
    undefined,
    {
        icon: IndentIcon,
        format: 'INDENT',
        name: 'Indent',
        handle: (editor: any) => {},
    },
    {
        icon: OutdentIcon,
        format: 'OUTDENT',
        name: 'Outdent',
        handle: (editor: any) => {},
    },
    undefined,
    { icon: AlignLeftIcon, format: 'ALIGN', name: 'Căn trái' },
    { icon: AlignCenterIcon, format: 'ALIGN', name: 'Căn giữa' },
    { icon: AlignRightIcon, format: 'ALIGN', name: 'Căn phải' },
    undefined,
    { icon: LineThrougnIcon, format: 'STRIKETHROUGH', name: 'Gạch ngang' },
];

function DropdownToolbar() {
    const [dropdown, setDropdown] = useState(false);

    return (
        <DropdownButton
            value='Khác'
            dropdown={() => (
                <div className={cx('wrapper')}>
                    <div className={cx('list')}>
                        {tools.map((item, index) => {
                            return item ? (
                                <DropdownToolbarItem
                                    key={item.name}
                                    format={item.format}
                                    icon={item.icon}
                                    name={item.name}
                                    setDropdown={setDropdown}
                                />
                            ) : (
                                <div key={index} className={cx('line-through')}>
                                    <span></span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        />
    );
}

export default DropdownToolbar;
