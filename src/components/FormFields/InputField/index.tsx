import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

import styles from './InputField.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder: string;
    isValid?: (name: string) => boolean;
    variant?: 'outline';
    type?: string;
}

const cx = classNames.bind(styles);

function InputField({
    name,
    control,
    label,
    placeholder,
    isValid,
    variant = 'outline',
    type = 'text',
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
                {isValid && isValid(value) ? 'Tên của thẻ đã tồn tại' : error?.message}
            </p>
        </div>
    );
}

export default InputField;
