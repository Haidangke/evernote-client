import { useState } from 'react';
import { TippyHeadless } from 'components/Tippy';
import { IoMdArrowDropright } from 'react-icons/io';
import classnames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { TippyButton } from 'components/Tippy';
import { ArrowDownIcon, CheckIcon, Setting } from 'assets/icons';

import avatar_default from 'assets/images/avatar';
import styles from './Header.module.scss';
import { authActions } from 'features/auth/authSlice';

const cx = classnames.bind(styles);

function Header() {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);
    const { isSmall } = useAppSelector((state) => state.sidebar);
    return (
        <div className={cx('wrapper', { small: isSmall })}>
            <div className={cx('left')}>
                <TippyHeadless
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
                                        Ưu tiên <IoMdArrowDropright />
                                    </div>
                                </div>
                            </div>
                            <footer
                                onClick={() => dispatch(authActions.logout())}
                                className={cx('drdown-footer')}
                            >
                                Đăng xuất khỏi {user?.email}
                            </footer>
                        </div>
                    }
                >
                    <div className={cx('info')} onClick={() => setVisible(!visible)}>
                        <div className={cx('avatar')}>{avatar_default}</div>

                        <div className={cx('email')}>
                            <p>{user?.email}</p>
                            <ArrowDownIcon />
                        </div>
                    </div>
                </TippyHeadless>
            </div>
            <TippyButton className={cx('logo')} placement='right' content='Cập nhật chế độ cài đặt'>
                <Setting />
            </TippyButton>
        </div>
    );
}

export default Header;
