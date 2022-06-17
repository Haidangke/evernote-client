import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import authPageImage from 'assets/images/auth_page';

import { useAppDispatch } from 'app/hooks';
import { login } from 'app/thunk/authThunk';
import { InputField } from 'components/FormFields';
import { LoginParams } from 'types';
import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm<LoginParams>({
        defaultValues: { username: 'haidangke', password: 'Haidangker12345' },
    });

    const handleFormSubmit = async (formValue: LoginParams) => {
        dispatch(login(formValue))
            .unwrap()
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch(() => {});
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('form')}>
                    <div className={cx('form-header')}>
                        <div className={cx('form-title')}>Đăng nhập vào tài khoản</div>
                        <div className={cx('form-description')}>
                            Sử dụng thông tin đăng nhập của bạn để truy cập tài khoản của bạn.
                        </div>
                    </div>
                    <div className={cx('form-main')}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <InputField
                                label='Tên tài khoản'
                                name='username'
                                control={control}
                                placeholder='Email Address'
                            />
                            <InputField
                                label='Mật khẩu'
                                name='password'
                                control={control}
                                placeholder='Password'
                            />
                        </form>
                        <div className={cx('actions')}>
                            <div className={cx('remember')}>
                                <input type='checkbox' />
                                Ghi nhớ tôi
                            </div>
                            <div className={cx('forgot')}>Quên mật khẩu?</div>
                        </div>
                        <button className={cx('submit')}>Đăng nhập</button>
                        <div className={cx('form-footer')}>
                            <span>Không có tài khoản?</span>
                            <Link to='/register'>Đăng kí tại đây</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('right-wrapper')}>
                    <div className={cx('image')}>{authPageImage}</div>
                    <div className={cx('intro')}>
                        <div className={cx('intro-title')}>Welcome to Forny.</div>
                        <div className={cx('intro-description')}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                            nonumm. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
