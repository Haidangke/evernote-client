import classNames from 'classnames/bind';

import { DeleteIcon, HomeIcon, MissionIcon, NoteIcon } from 'assets/icons';
import { routesConfig } from 'config';

import { useAppSelector } from 'app/hooks';
import ShortcutItemSidebar from 'features/shortcut/components/ShortcutItemSidebar';
import TagItemSidebar from 'features/tag/components/TagItemSidebar';
import SidebarMenuItem from './MenuItem';
import NotebookItemSidebar from 'features/notebook/components/NotebookItemSidebar';

import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function Menu() {
    const { isSmall } = useAppSelector((state) => state.sidebar);
    return (
        <div className={cx('wrapper', { wrapper__small: isSmall })}>
            <SidebarMenuItem
                topic={{ title: 'Trang chủ' }}
                icon={{ main: HomeIcon }}
                types={['link']}
                navigate={{ path: routesConfig.home }}
            />
            <ShortcutItemSidebar />
            <SidebarMenuItem
                icon={{ main: NoteIcon }}
                topic={{ title: 'Ghi chú' }}
                types={['link']}
                navigate={{ path: routesConfig.notes, params: { an: true } }}
            />

            <SidebarMenuItem
                topic={{ title: 'Nhiệm vụ', value: 'todo' }}
                icon={{ main: MissionIcon }}
                types={[]}
            />
            <div className={cx('line-space')}></div>

            <NotebookItemSidebar/>
            <TagItemSidebar />
            <div className={cx('line-space')}></div>
            <SidebarMenuItem
                topic={{ title: 'Thùng rác' }}
                icon={{ main: DeleteIcon }}
                types={['link']}
                navigate={{ path: routesConfig.recycle }}
            />
        </div>
    );
}

export default Menu;
