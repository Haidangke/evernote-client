import classNames from 'classnames/bind';
import { IoSearchSharp } from 'react-icons/io5';
import styles from './SearchHightlight.module.scss';

const cx = classNames.bind(styles);

function SearchHightlight({ setSearch }: any) {
    return (
        <div className={cx('wrapper')}>
            <IoSearchSharp className={cx('search-icon')} />
            <input
                type='search'
                placeholder='Search the text...'
                onChange={(e) => setSearch(e.target.value)}
                className={cx('search-input')}
            />
        </div>
    );
}

export default SearchHightlight;
