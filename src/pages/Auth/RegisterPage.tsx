import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import * as yup from 'yup';

import Auth from 'pages/Auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { register } from 'app/thunk/authThunk';
import { InputField } from 'components/FormFields';
import { RegisterParams } from 'types';

import styles from './Auth.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';

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
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm<RegisterParams>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValue: RegisterParams) => {
        dispatch(register(formValue))
            .unwrap()
            .then(() => {
                reset(defaultValues);
                navigate('/login');
            })
            .catch(() => {});
    };

    return (
        <Auth page='register'>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name='email' control={control} placeholder='Email' />
                <InputField name='username' control={control} placeholder='Username' />
                <InputField
                    type='password'
                    name='password'
                    control={control}
                    placeholder='Password'
                />
                <InputField
                    type='password'
                    name='passwordConfirm'
                    control={control}
                    placeholder='Password Confirm'
                />
                <button type='submit' className={styles.submit}>
                    {registering ? <ReactLoading height={22} width={22} type='spin' /> : ' Đăng kí'}
                </button>
            </form>
        </Auth>
    );
}

export default Register;
