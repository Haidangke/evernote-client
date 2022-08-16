import { AiOutlineArrowUp } from 'react-icons/ai';
import classNames from 'classnames/bind';


import { useAppSelector } from 'app/hooks';
import { Sort } from 'config/actions';

import styles from './Table.module.scss';
import NotebookItem from './NotebookItem';
const cx = classNames.bind(styles);

interface TableProps {
    sort: Sort;
    search: string;
}

function Table({ sort, search }: TableProps) {
    const { notebooks } = useAppSelector((state) => state.notebook);
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.row}>
                    <div className={cx('column')}>
                        Tiêu đề
                        <AiOutlineArrowUp />
                    </div>
                    <div className={cx('column')}>Người tạo</div>
                    <div className={cx('column')}>Đã cập nhật</div>
                    <div className={cx('column')}>Được chia sẽ với</div>
                    <div className={cx('column')}>Hành động</div>
                </div>
            </header>
            <div className={styles.main}>
                {[...notebooks]
                    .sort((notebookA, notebookB) => {
                        if (sort === 'title') return notebookA.name.localeCompare(notebookB.name);
                        return (
                            new Date(notebookB[sort]).getTime() -
                            new Date(notebookA[sort]).getTime()
                        );
                    })
                    .filter((notebook) =>
                        notebook.name.toLowerCase().includes(search.toLowerCase().trim())
                    )
                    .map((notebook) => (
                        <NotebookItem
                            key={notebook._id}
                            notebook={notebook}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Table;
