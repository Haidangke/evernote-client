import { SearchIcon } from 'assets/icons';
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
                onChange={(e) => setValue(e.target.value)}
                type='text'
                placeholder={placeholder}
                value={value}
            />
            <SearchIcon />
        </div>
    );
}

export default SearchInput;
