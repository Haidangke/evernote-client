import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

import styles from './InputField.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder: string;
}

const cx = classNames.bind(styles);

function InputField({ name, control, label, placeholder }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({ name, control });
    return (
        <div className={cx('wrapper')}>
            <label className={cx('label')}>{label}</label>
            <input
                className={cx('input', { error })}
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type='text'
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputField;
