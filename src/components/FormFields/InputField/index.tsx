import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import * as yup from 'yup';
import classNames from 'classnames/bind';

import styles from './InputField.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder: string;
    handleValid?: (name: string) => boolean;
    variant?: 'outline';
    type?: string;
    errorProp?: string;
}

const cx = classNames.bind(styles);

function InputField({
    name,
    control,
    label,
    placeholder,
    handleValid,
    variant = 'outline',
    type = 'text',
    errorProp,
}: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className={cx('wrapper')}>
            {label && (
                <label htmlFor={`input-${name}`} className={cx('label')}>
                    {label}
                </label>
            )}
            <input
                autoComplete='on'
                id={`input-${name}`}
                className={cx('input', { [variant]: true })}
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                placeholder={placeholder}
            />
            <p className={cx('error')}>
                {handleValid && handleValid(value) ? errorProp : error?.message}
            </p>
        </div>
    );
}

export default InputField;

export const nameSchema = yup
    .object()
    .shape({
        name: yup
            .string()
            .required('Trường tên của thẻ phải có độ dài tối thiểu 1')
            .min(1, 'Trường tên của thẻ phải có độ dài tối thiểu 1')
            .max(30, 'Trường tên của thẻ chỉ có độ dài tối đa 30'),
    })
    .required();
