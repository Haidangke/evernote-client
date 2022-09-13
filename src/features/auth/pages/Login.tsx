import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';

import Auth from '.';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { LoginParams } from 'types';

import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import authService from 'services/authService';

import styles from './Auth.module.scss';
import { authActions } from '../authSlice';
import Loading from 'components/Loading';
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
    const [validEmail, setValidEmail] = useState(false);
    const { message, logging } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { control, handleSubmit, reset, getValues } = useForm<LoginParams>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValue: LoginParams) => {
        // dispatch(login({ formValue, remember }))
        //     .unwrap()
        //     .then(() => {
        //         reset(defaultValues);
        //         navigate('/');
        //     })
        //     .catch(() => {});
        dispatch(authActions.login(formValue));
    };

    const handleCheckEmail = () => {
        const { email } = getValues();
        authService
            .checkEmail({ email })
            .then((res) => {
                setValidEmail(true);
            })
            .catch((error) => {
                console.log(error.response.data.msg);
                setValidEmail(false);
            });
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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name='email' control={control} placeholder='Địa chỉ email' />
                {validEmail && (
                    <div className={cx('input-hide')}>
                        <InputField
                            type='password'
                            name='password'
                            control={control}
                            placeholder='Password'
                        />
                    </div>
                )}
                <button
                    disabled={logging}
                    type={validEmail ? 'submit' : 'button'}
                    onClick={!validEmail ? handleCheckEmail : () => {}}
                    className={cx('submit', { disable: logging })}
                >
                    {logging ? (
                        <Loading height='22px' width="22px" />
                    ) : validEmail ? (
                        'Đăng nhập'
                    ) : (
                        'Tiếp tục'
                    )}
                </button>
            </form>

            <div className={cx('actions')}>
                <div className={cx('remember')}>
                    <input
                        onChange={() => setRemember(!remember)}
                        type='checkbox'
                        defaultChecked={remember}
                    />
                    <span>Ghi nhớ tôi trong 30 ngày</span>
                </div>
            </div>
        </Auth>
    );
}

export default Login;
