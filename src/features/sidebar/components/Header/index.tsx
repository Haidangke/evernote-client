import classnames from 'classnames/bind';
import { TippyHeadLess } from 'components/Tippy';
import { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

import { useAppSelector } from 'app/hooks';

import { ArrowDownIcon, CheckIcon, Setting } from 'components/Icons';
import { TippyButton } from 'components/Tippy';
import authService from 'services/authService';

import avatar_default from 'assets/images/avatar.png';
import styles from './Header.module.scss';

const cx = classnames.bind(styles);

function Header() {
    const { user } = useAppSelector((state) => state.auth);
    const [visible, setVisible] = useState(false);
    const { isSmall } = useAppSelector((state) => state.sidebar);

    return (
        <div className={cx('wrapper', { small: isSmall })}>
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
                                    {/* <div className={cx('avatar')}>{avatar_default}</div> */}
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
                                onClick={() => authService.logout()}
                                className={cx('drdown-footer')}
                            >
                                Đăng xuất khỏi {user?.email}
                            </footer>
                        </div>
                    }
                >
                    <div className={cx('info')} onClick={() => setVisible(!visible)}>
                        <div className={cx('avatar')}>
                            {/* <img src={avatar_default} alt='avatar' /> */}
                            <span>{user?.email && user.email[0]}</span>
                        </div>

                        <div className={cx('email')}>
                            <p>{user?.email}</p>
                            <ArrowDownIcon />
                        </div>
                    </div>
                </TippyHeadLess>
            </div>
            {/* <TippyButton className={cx('logo')} placement='right' content='Cập nhật chế độ cài đặt'>
                <Setting />
            </TippyButton> */}
        </div>
    );
}

export default Header;
