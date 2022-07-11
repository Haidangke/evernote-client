import { useState } from 'react';

import { Sort } from 'config/actions';
import SearchInput from 'components/SearchInput';
import Header from './Header';
import Table from './Table';
import styles from './Notebook.module.scss';

function Notebook() {
    const [searchValue, setSearchValue] = useState('');
    const [sort, setSort] = useState<Sort>('createdAt');
    return (
        <div className={styles.wrapper}>
            <div className={styles.topbar}>
                <span>Sổ tay</span>
                <div className={styles.search}>
                    <SearchInput
                        value={searchValue}
                        setValue={setSearchValue}
                        placeholder='Tìm sổ tay...'
                    />
                </div>
            </div>
            <Header sort={sort} setSort={setSort} />
            <div className={styles.main}>
                <Table sort={sort} search={searchValue} />
            </div>
        </div>
    );
}

export default Notebook;
