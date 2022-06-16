import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

import styles from './InputField.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder: string;
    isValid: (name: string) => boolean;
}

const cx = classNames.bind(styles);

function InputField({ name, control, label, placeholder, isValid }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className={cx('wrapper')}>
            <label className={cx('label')}>{label}</label>
            <input
                className={cx('input')}
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type='text'
                placeholder={placeholder}
            />
            <p className={cx('error')}>
                {isValid(value) ? 'Tên của thẻ đã tồn tại' : error?.message}
            </p>
        </div>
    );
}

export default InputField;
