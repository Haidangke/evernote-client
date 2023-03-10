import { IoSearchSharp } from 'react-icons/io5';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
    value: string;
    setValue: any;
    placeholder: string;
}

function SearchInput({ value, setValue, placeholder }: SearchInputProps) {
    return (
        <div className={styles.search}>
            <input
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
