import classNames from 'classnames/bind';
import React from 'react';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
    content: string;
    onClick: () => void;
    type: 'primary' | 'outline';
    disabled?: boolean;
}

function Button({ content, type, onClick, disabled = false }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cx('wrapper', {
                disabled,
                primary: type === 'primary',
                outline: type === 'outline',
            })}
        >
            {content}
        </button>
    );
}

export default Button;
