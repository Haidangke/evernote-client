import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import * as yup from 'yup';

import Auth from 'pages/Auth';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { login } from 'app/thunk/authThunk';
import { InputField } from 'components/FormFields';
import { LoginParams } from 'types';
import styles from './Auth.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const defaultValues = { email: 'vatcmnvo@gmail.com', password: 'Haidangker12345' };

const schema = yup
    .object()
    .shape({
        email: yup
            .string()
            .required('Email là bắt buộc ')
            .min(6, 'Email tối thiếu 6 kí tự')
            .max(30, 'Email tối đa 30 kí tự')
            .email('Định dạng của email không hợp lệ'),
        password: yup
            .string()
            .required('Mật khẩu là bắt buộc là bắt buộc ')
            .min(6, 'Mật khẩu là bắt buộc tối thiếu 6 kí tự')
            .max(30, 'Mật khẩu là bắt buộc tối đa 30 kí tự'),
    })
    .required();

const cx = classNames.bind(styles);
function Login() {
    const [remember, setRemember] = useState(false);

    const { message, logging, isLoggedIn } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm<LoginParams>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValue: LoginParams) => {
        dispatch(login({ formValue, remember }))
            .unwrap()
            .then(() => {
                reset(defaultValues);
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <Auth page='login'>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name='email' control={control} placeholder='Email Address' />
                <InputField
                    type='password'
                    name='password'
                    control={control}
                    placeholder='Password'
                />
                <button
                    disabled={logging}
                    type='submit'
                    className={cx('submit', { disable: logging })}
                >
                    {logging ? <ReactLoading height={22} width={22} type='spin' /> : 'Đăng nhập'}
                </button>
            </form>

            <div className={cx('actions')}>
                <div className={cx('remember')}>
                    <input
                        onChange={() => setRemember(!remember)}
                        type='checkbox'
                        defaultChecked={remember}
                    />
                    <span>Ghi nhớ tôi</span>
                </div>
                <div className={cx('forgot')}>Quên mật khẩu?</div>
            </div>
        </Auth>
    );
}

export default Login;
