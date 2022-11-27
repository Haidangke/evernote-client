import { Dispatch, SetStateAction, useState } from 'react';

import { AddNotebookIcon } from 'components/Icons';
import { useAppSelector } from 'app/hooks';
import { TippySort } from 'components/Tippy';
import { SortConfig } from 'config/actions';
import NotebookAdd from '../NotebookAdd';

import styles from './NotebookHeader.module.scss';

interface HeaderProps {
    sort: SortConfig;
    setSort: Dispatch<SetStateAction<SortConfig>>;
}

function Header({ sort, setSort }: HeaderProps) {
    const [isModal, setIsModal] = useState(false);
    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.left}>{notebooks.length} sổ tay</div>
                <div className={styles.right}>
                    <div onClick={() => setIsModal(true)} className={styles.new}>
                        <AddNotebookIcon className={styles.icon} />
                        <span>Sổ tay Mới</span>
                    </div>
                    <TippySort sort={sort} setSort={setSort} />
                </div>
            </div>
            <NotebookAdd isModal={isModal} setIsModal={setIsModal} />
        </>
    );
}

export default Header;
