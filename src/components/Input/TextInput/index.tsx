import { useState } from 'react';
import classNames from 'classnames/bind';

import { TimesIcon } from 'components/Icons';
import styles from './TextInput.module.scss';

const cx = classNames.bind(styles);

interface TextInputProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
    placeholder: string;
}

function TextInput({ value, setValue, placeholder, label }: TextInputProps) {
    const [focus, setFocus] = useState(false);
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor={styles.input}>
                {label}
            </label>
            <input
                className={cx('input', { focus })}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                id={styles.input}
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {/* {focus && <TimesIcon className={styles.icon} onClick={() => setValue('')} />} */}
            <div className={styles.icon} onClick={() => setValue('')}>
                <TimesIcon />
            </div>
        </div>
    );
}

export default TextInput;
