import classNames from 'classnames/bind';

import { routesConfig } from 'config';
import { DeleteIcon, HomeIcon, NoteIcon, MissionIcon } from 'assets/icons';

import MenuItem from './MenuItem';
import Tag from './Tag';
import Notebook from './Notebook';
import Shortcut from './Shortcut';

import styles from './Menu.module.scss';
import { useAppSelector } from 'app/hooks';

const cx = classNames.bind(styles);

function Menu() {
    const { isSmall } = useAppSelector((state) => state.sidebar);
    return (
        <div className={cx('menu', { menu__small: isSmall })}>
            <MenuItem
                topic={{ title: 'Trang chủ' }}
                icon={{ main: HomeIcon }}
                types={['link']}
                navigate={{ path: routesConfig.home }}
            />
            <Shortcut />
            <MenuItem
                icon={{ main: NoteIcon }}
                topic={{ title: 'Ghi chú' }}
                types={['link']}
                navigate={{ path: routesConfig.notes, params: { an: true } }}
            />

            <MenuItem
                topic={{ title: 'Nhiệm vụ', value: 'todo' }}
                icon={{ main: MissionIcon }}
                types={['menu']}
            />
            <div className={cx('line-space')}></div>

            <Notebook />
            <Tag />
            <div className={cx('line-space')}></div>
            <MenuItem
                topic={{ title: 'Thùng rác' }}
                icon={{ main: DeleteIcon }}
                types={['link']}
                navigate={{ path: routesConfig.recycle }}
            />
        </div>
    );
}

export default Menu;
