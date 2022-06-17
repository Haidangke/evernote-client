import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';

import { ArrowDownIcon, Setting } from 'assets/icons';
import styles from 'layouts/components/Sidebar/Sidebar.module.scss';
import avatar_default from 'assets/images/avatar_default';

const cx = classnames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('header-left')}>
                <div className={cx('header-avatar')}>{avatar_default}</div>

                <div className={cx('header-info')}>
                    <p>vatcmnvo@gmail.com</p>
                    <ArrowDownIcon />
                </div>
            </div>
            <Tippy content='Cập nhật chế độ cài đặt' placement='right'>
                <div className={cx('header-logo')}>
                    <Setting />
                </div>
            </Tippy>
        </div>
    );
}

export default Header;
