import classNames from 'classnames/bind';
import { SearchIcon } from '~/assets/icons';
import styles from './SearchHightlight.module.scss';

const cx = classNames.bind(styles);

function SearchHightlight({ setSearch }: any) {
    return (
        <div className={cx('wrapper')}>
            <SearchIcon className={cx('seach-icon')} />
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
