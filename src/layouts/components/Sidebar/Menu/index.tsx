import classNames from 'classnames/bind';
import { DeleteIcon, HomeIcon, NoteIcon, MissionIcon } from 'assets/icons';

import MenuItem from './MenuItem';
import Tag from './Tag';
import Notebook from './Notebook';
import Shortcut from './Shortcut';

import styles from './Menu.module.scss';

interface MenuProps {
    isSmallSidebar: boolean;
}

const cx = classNames.bind(styles);

function Menu({ isSmallSidebar }: MenuProps) {
    return (
        <div className={cx('menu', { menu__small: isSmallSidebar })}>
            <MenuItem
                topic={{ value: '', title: 'Trang chủ' }}
                icon={{ main: HomeIcon }}
                types={['link']}
            />
            <Shortcut />
            <MenuItem
                icon={{ main: NoteIcon }}
                topic={{ value: 'note', title: 'Ghi chú' }}
                types={['link']}
                onAdd={() => {}}
            />

            <MenuItem
                topic={{ title: 'Nhiệm vụ', value: 'todo' }}
                icon={{ main: MissionIcon }}
                types={['menu']}
                onAdd={() => {}}
            />
            <div className={cx('line-space')}></div>

            <Notebook />
            <Tag />
            <div className={cx('line-space')}></div>
            <MenuItem
                topic={{ title: 'Thùng rác', value: 'recycle' }}
                icon={{ main: DeleteIcon }}
                types={['link']}
            />
        </div>
    );
}

export default Menu;
