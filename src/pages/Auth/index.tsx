import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import authPageImage from 'assets/images/auth_page';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { useAppSelector } from 'app/hooks';

const cx = classNames.bind(styles);

interface AuthProps {
    page: 'login' | 'register';
    children: ReactNode;
}

const authText = {
    login: {
        title: 'Đăng nhập vào tài khoản',
        description: 'Sử dụng thông tin đăng nhập của bạn để truy cập tài khoản của bạn.',
        submit: 'Đăng nhập',
        answer: 'Không có tài khoản?',
        action: 'Đăng kí tại đây',
    },
    register: {
        title: 'Tạo một tài khoản',
        description: 'Thiết lập một tài khoản mới trong một vài giây đến một phút .',
        submit: 'Đăng kí',
        answer: 'Bạn đã có tài khoản?',
        action: 'Đăng nhập tại đây',
    },
};

function Auth({ page, children }: AuthProps) {
    const { message } = useAppSelector((state) => state.auth);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('form')}>
                    <div className={cx('form-header')}>
                        <div className={cx('form-title')}>{authText[page].title}</div>
                        <div className={cx('form-description')}>{authText[page].description}</div>
                    </div>
                    <div className={cx('form-main')}>
                        {children}
                        <div className={styles.error}>{message}</div>

                        <div className={cx('form-footer')}>
                            <span>{authText[page].answer}</span>
                            <Link to={page === 'login' ? '/register' : '/login'}>
                                {authText[page].action}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('right-wrapper')}>
                    <div className={cx('image')}>{authPageImage}</div>
                    <div className={cx('intro')}>
                        <div className={cx('intro-title')}>Welcome to NoteKe</div>
                        <div className={cx('intro-description')}>
                            Ghi chép lại mọi thứ, mọi lúc, mọi nơi một cách nhanh chóng, tiện lợi và
                            hoàn toàn miễn phí.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
