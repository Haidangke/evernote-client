import classNames from 'classnames/bind';
import { useState } from 'react';
import { BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import authService from 'services/authService';
import { getFCMToken } from 'firebase-config';
import { validateEmail } from 'utils/StringUtils';
import { authActions } from '../authSlice';
import Auth from '.';

import Loading from 'components/Loading';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);
function Login() {
    const [validEmail, setValidEmail] = useState(false);
    const { logging, errorLogin } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (!password) return setErrPassword('Bạn chưa nhập mật khẩu');
        if (password.length < 6) return setErrPassword('Mật khẩu tối thiếu 6 kí tự');
        const deviceToken = await getFCMToken();

        dispatch(authActions.login({ email, password, deviceToken }));
    };

    const handleCheckEmail = () => {
        if (!email) {
            return setErrEmail('Bạn chưa nhập email');
        }
        if (!validateEmail(email)) {
            return setErrEmail('Email không hợp lệ');
        }
        authService
            .checkEmail({ email })
            .then((res) => {
                setValidEmail(true);
            })
            .catch((error) => {
                setErrEmail(error.response.data.msg);
                setValidEmail(false);
            });
    };

    const handleChangeEmail = (e: any) => {
        const value = e.target.value;
        setValidEmail(false);
        setEmail(value);
        if (value && validateEmail(value)) {
            setErrEmail('');
        }
    };

    const handleChangePassword = (e: any) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length > 6) {
            setErrPassword('');
        }
    };

    return (
        <Auth page='login'>
            <div className={cx('method')}>
                <div className={cx('method-item')}>
                    <FcGoogle />
                    <span>Tiếp tục với Google</span>
                </div>
                <div className={cx('method-item')}>
                    <BsApple />
                    <span>Tiếp tục với Apple</span>
                </div>
            </div>

            <div className={cx('or')}>hoặc</div>
            <form onSubmit={handleFormSubmit}>
                <input
                    value={email}
                    onChange={handleChangeEmail}
                    className={styles.input}
                    name='email'
                    placeholder='Địa chỉ email'
                />
                {errEmail && <div className={cx('input-error')}>{errEmail}</div>}
                {validEmail && (
                    <div className={cx('input-hide')}>
                        <input
                            onChange={handleChangePassword}
                            value={password}
                            type='password'
                            className={styles.input}
                            name='password'
                            autoComplete='on'
                            placeholder='Mật khẩu'
                        />
                        {errorLogin ? (
                            <div className={cx('input-error')}>{errorLogin}</div>
                        ) : (
                            errPassword && <div className={cx('input-error')}>{errPassword}</div>
                        )}
                    </div>
                )}
                <button
                    disabled={logging}
                    type={validEmail ? 'submit' : 'button'}
                    onClick={handleCheckEmail}
                    className={cx('submit', { disable: logging })}
                >
                    {logging ? (
                        <Loading height='22px' width='22px' />
                    ) : validEmail ? (
                        'Đăng nhập'
                    ) : (
                        'Tiếp tục'
                    )}
                </button>
            </form>
        </Auth>
    );
}

export default Login;
