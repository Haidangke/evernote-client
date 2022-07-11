import { Dispatch, SetStateAction } from 'react';

import { AddNotebookIcon } from 'assets/icons';
import { TippySort } from 'components/Tippy';
import { Sort } from 'config/actions';
import styles from './Header.module.scss';

interface HeaderProps {
    sort: Sort;
    setSort: Dispatch<SetStateAction<Sort>>;
}

function Header({ sort, setSort }: HeaderProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>3 sổ tay</div>
            <div className={styles.right}>
                <div className={styles.new}>
                    <AddNotebookIcon className={styles.icon} />
                    <span>Sổ tay Mới</span>
                </div>
                <TippySort sort={sort} setSort={setSort} />
            </div>
        </div>
    );
}

export default Header;
