import classNames from 'classnames/bind';

import { DeleteIcon, HomeIcon, MissionIcon, NoteIcon } from 'components/Icons';
import { routesConfig } from 'config/routes';

import { useAppSelector } from 'app/hooks';
import SidebarMenuItem from './MenuItem';
import ShortcutItemSidebar from './ShortcutItemSidebar';
import NotebookItemSidebar from './NotebookItemSidebar';

import styles from './Menu.module.scss';
import TagItemSidebar from './TagItemSidebar';
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

            {/* <SidebarMenuItem
                topic={{ title: 'Nhiệm vụ' }}
                icon={{ main: MissionIcon }}
                types={[]}
            /> */}
            <div className={cx('line-space')}></div>

            <NotebookItemSidebar />
            <TagItemSidebar />
            <div className={cx('line-space')}></div>
            <SidebarMenuItem
                topic={{ title: 'Thùng rác' }}
                icon={{ main: DeleteIcon }}
                types={['link']}
                navigate={{ path: routesConfig.recycle, params: { an: true } }}
            />
        </div>
    );
}

export default Menu;
