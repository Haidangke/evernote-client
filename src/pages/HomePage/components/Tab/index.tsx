import classNames from 'classnames/bind';
import styles from './Tab.module.scss';
const cx = classNames.bind(styles);

function Tab() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('item', 'item__active')}>Gần đây</span>
            <span className={cx('item')}>Được đề xuất</span>
        </div>
    );
}

export default Tab;
