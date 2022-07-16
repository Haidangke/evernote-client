import classNames from 'classnames/bind';
import React from 'react';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export type Variant = 'primary' | 'outline' | 'danger';

interface ButtonProps {
    content: string;
    onClick?: () => void;
    variant: Variant;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
}

function Button({ content, variant, onClick, disabled = false, type = 'button' }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cx('wrapper', {
                disabled,
                primary: variant === 'primary',
                outline: variant === 'outline',
                danger: variant === 'danger',
            })}
        >
            {content}
        </button>
    );
}

export default Button;
