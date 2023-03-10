import { useState } from 'react';

import { SortConfig } from 'config/actions';
import SearchInput from 'components/Input/SearchInput';
import NotebookHeader from './components/NotebookHeader';
import NotebookTable from './components/NotebookTable';

import styles from './Notebook.module.scss';

function Notebook() {
    const [searchValue, setSearchValue] = useState('');
    const [sort, setSort] = useState<SortConfig>('createdAt');
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
            <NotebookHeader sort={sort} setSort={setSort} />
            <div className={styles.main}>
                <NotebookTable sort={sort} search={searchValue} />
            </div>
        </div>
    );
}

export default Notebook;
