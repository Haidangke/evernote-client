import classNames from 'classnames/bind';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import styles from './SearchInput.module.scss';
const cx = classNames.bind(styles);

interface SearchInputProps {
    value: string;
    setValue: any;
    placeholder: string;
}

function SearchInput({ value, setValue, placeholder }: SearchInputProps) {
    const [focus, setFocus] = useState(false);
    return (
        <div
            className={cx('wrapper', {
                'wrapper--focus': focus,
            })}
        >
            <input
                className={styles.input}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length <= 1) {
                        setValue(inputValue.trim());
                    } else {
                        setValue(inputValue);
                    }
                }}
                type='text'
                placeholder={placeholder}
                value={value}
            />
            <IoSearchSharp />
        </div>
    );
}

export default SearchInput;
