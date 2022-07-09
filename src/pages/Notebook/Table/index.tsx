import { AiOutlineArrowUp } from 'react-icons/ai';
import classNames from 'classnames/bind';

import Row from './Row';
import styles from './Table.module.scss';
import { useAppSelector } from 'app/hooks';
const cx = classNames.bind(styles);

function Table() {
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
                {notebooks.map((notebook, index) => (
                    <Row key={notebook._id} notebook={notebook} isHightlight={index % 2 !== 0} />
                ))}
            </div>
        </div>
    );
}

export default Table;
