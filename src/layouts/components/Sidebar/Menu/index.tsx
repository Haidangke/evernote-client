import classNames from 'classnames/bind';

import { DeleteIcon, HomeIcon, NoteIcon, NoteSolidIcon, StarIcon, MissionIcon } from 'assets/icons';

import styles from './Menu.module.scss';

import MenuItem from './MenuItem';
import Tag from './Tag';
import Notebook from './Notebook';

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
                icon={MissionIcon}
                types={['menu']}
                onAdd={() => {}}
            />
            <div className={cx('line-space')}></div>

            <Notebook />
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
