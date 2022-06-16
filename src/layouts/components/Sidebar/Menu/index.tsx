import classNames from 'classnames/bind';

import {
    DeleteIcon,
    HomeIcon,
    NotebookIcon,
    NoteIcon,
    NoteSolidIcon,
    StarIcon,
    TodoIcon,
} from 'assets/icons';
import Tag from '../Tag';

import styles from './Menu.module.scss';

import MenuItem from './MenuItem';

interface MenuProps {
    isSmallSidebar: boolean;
}

const cx = classNames.bind(styles);

function Menu({ isSmallSidebar }: MenuProps) {
    return (
        <div className={cx('menu', { menu__small: isSmallSidebar })}>
            <MenuItem value='home' name='Trang chủ' path='/' icon={HomeIcon} types={['link']} />
            <MenuItem
                icon={StarIcon}
                name='Lối tắt'
                value='shortcuts'
                types={['menu']}
                items={[
                    { name: 'Chưa có tiêu đề', icon: NoteSolidIcon },
                    { name: 'Chưa có tiêu đề', icon: NoteSolidIcon },
                    { name: 'Chưa có tiêu đề', icon: NoteSolidIcon },
                ]}
            />
            <MenuItem
                icon={NoteIcon}
                name='Ghi chú'
                value='note'
                types={['link']}
                path='/note'
                onAdd={() => {}}
            />

            <MenuItem
                value='todo'
                name='Nhiệm vụ'
                path='/todo'
                icon={TodoIcon}
                types={['menu']}
                onAdd={() => {}}
            />
            <div className={cx('line-space')}></div>

            <MenuItem
                value='notebook'
                name='Sổ tay'
                path='/notebook'
                icon={NotebookIcon}
                types={['link', 'menu']}
                onAdd={() => {}}
            />
            <Tag />
            <div className={cx('line-space')}></div>
            <MenuItem
                value='recycle'
                name='Thùng rác'
                path='/recycle'
                icon={DeleteIcon}
                types={['link']}
            />
        </div>
    );
}

export default Menu;
