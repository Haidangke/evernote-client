import { useState } from 'react';

import SearchInput from 'components/SearchInput';
import Header from './Header';
import Table from './Table';
import styles from './Notebook.module.scss';

function Notebook() {
    const [searchValue, setSearchValue] = useState('');
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
            <Header />
            <div className={styles.main}>
                <Table />
            </div>
        </div>
    );
}

export default Notebook;
