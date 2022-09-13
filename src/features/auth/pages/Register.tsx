import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { RegisterParams } from 'types';
import Auth from '.';
import { yupResolver } from '@hookform/resolvers/yup';
import Loading from 'components/Loading';
import { authActions } from '../authSlice';

import styles from './Auth.module.scss';
const defaultValues = { username: '', password: '', email: '', passwordConfirm: '' };

const schema = yup
    .object()
    .shape({
        email: yup
            .string()
            .required('Email là bắt buộc ')
            .min(6, 'Email tối thiếu 6 kí tự')
            .max(30, 'Email tối đa 30 kí tự')
            .email('Định dạng của email không hợp lệ'),
        username: yup
            .string()
            .required('Email là bắt buộc ')
            .min(3, 'Email tối thiếu 3 kí tự')
            .max(30, 'Email tối đa 30 kí tự'),
        password: yup
            .string()
            .required('Mật khẩu là bắt buộc là bắt buộc ')
            .min(6, 'Mật khẩu là bắt buộc tối thiếu 6 kí tự')
            .max(30, 'Mật khẩu là bắt buộc tối đa 30 kí tự'),
        passwordConfirm: yup
            .string()
            .required('Mật khẩu là bắt buộc là bắt buộc ')
            .min(6, 'Mật khẩu là bắt buộc tối thiếu 6 kí tự')
            .max(30, 'Mật khẩu là bắt buộc tối đa 30 kí tự')
            .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không khớp'),
    })
    .required();

function Register() {
    const { registering } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { control, handleSubmit, reset } = useForm<RegisterParams>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValue: RegisterParams) => {
        dispatch(authActions.register(formValue));
    };

    return (
        <Auth page='register'>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name='email' control={control} placeholder='Email' />
                <InputField name='username' control={control} placeholder='Tên người dùng' />
                <InputField
                    type='password'
                    name='password'
                    control={control}
                    placeholder='Mật khẩu'
                />
                <InputField
                    type='password'
                    name='passwordConfirm'
                    control={control}
                    placeholder='Nhập lại mật khẩu'
                />
                <button type='submit' className={styles.submit}>
                    {registering ? <Loading height='22px' width='22px' /> : ' Đăng kí'}
                </button>
            </form>

            <div className={styles.policy}>
                Bằng việc tạo một tài khoản, bạn đồng ý với Điều khoản dịch vụ và Chính sách về
                Quyền riêng tư.
            </div>
        </Auth>
    );
}

export default Register;
