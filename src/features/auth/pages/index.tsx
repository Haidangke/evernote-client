import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import logo from 'assets/svg/logo.svg';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

interface AuthProps {
    page: 'login' | 'register';
    children: ReactNode;
}

const authText = {
    login: {
        title: 'Đăng nhập vào tài khoản',
        description:
            'Đừng lo ghi bạn không thể ghi nhớ, Noteke sẽ giúp bạn ghi chú mọi thư, mọi lúc và mọi nơi',
        answer: 'Bạn không có tài khoản?',
        action: 'Tạo tài khoản',
    },
    register: {
        title: 'Tạo một tài khoản',
        description: 'Thiết lập một tài khoản mới trong một vài giây đến một phút .',
        answer: 'Bạn đã có tài khoản?',
        action: 'Đăng nhập tại đây',
    },
};

function Auth({ page, children }: AuthProps) {
    return (
        <div className={cx('root', { [page]: true })}>
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <div className={cx('form-header')}>
                        <div className={cx('logo')}>
                            <img src={logo} alt='logo' />
                            <span>Noteke</span>
                        </div>
                        <div className={cx('form-description')}>Ghi nhớ mọi thứ quan trọng</div>
                    </div>

                    <div className={cx('form-main')}>
                        {children}
                        <div className={cx('form-footer')}>
                            <div>{authText[page].answer}</div>
                            <Link to={page === 'login' ? '/register' : '/login'}>
                                {authText[page].action}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
