import { useState } from 'react';
import { TippyHeadLess } from 'components/Tippy';
import classnames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'app/thunk/authThunk';

import { TippyButton } from 'components/Tippy';
import { ArrowDownIcon, CheckIcon, Setting, TriangleIcon } from 'assets/icons';

import avatar_default from 'assets/images/avatar_default';
import styles from './Header.module.scss';

interface HeaderProps {
    isSmallSidebar: boolean;
}

const cx = classnames.bind(styles);

function Header({ isSmallSidebar }: HeaderProps) {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);
    return (
        <div className={cx('wrapper', { small: isSmallSidebar })}>
            <div className={cx('left')}>
                <TippyHeadLess
                    visible={visible}
                    setVisible={setVisible}
                    dropdown={
                        <div className={cx('drdown')}>
                            <header className={cx('drdown-header')}>
                                <div className={cx('drdown-title')}>Tài khoản</div>
                                <div className={cx('info')}>
                                    <CheckIcon className={cx('drdown-icon')} />
                                    <div className={cx('avatar')}>{avatar_default}</div>
                                    <div className={cx('email')}>{user?.email}</div>
                                </div>
                            </header>
                            <div className={cx('drdown-body')}>
                                <div className={cx('drdown-list')}>
                                    <div className={cx('drdown-item')}>Thông tin tài khoản...</div>
                                    <div className={cx('drdown-item')}>
                                        Ưu tiên <TriangleIcon />
                                    </div>
                                </div>
                            </div>
                            <footer
                                onClick={() => dispatch(logout())}
                                className={cx('drdown-footer')}
                            >
                                Đăng xuất khỏi {user?.email}
                            </footer>
                        </div>
                    }
                >
                    <div className={cx('info')}>
                        <div className={cx('avatar')}>{avatar_default}</div>

                        <div onClick={() => setVisible(!visible)} className={cx('email')}>
                            <p>{user?.email}</p>
                            <ArrowDownIcon />
                        </div>
                    </div>
                </TippyHeadLess>
            </div>
            <TippyButton className={cx('logo')} placement='right' content='Cập nhật chế độ cài đặt'>
                <Setting />
            </TippyButton>
        </div>
    );
}

export default Header;
