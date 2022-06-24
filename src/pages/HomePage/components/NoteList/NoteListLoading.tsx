import classNames from 'classnames/bind';
import styles from './NoteList.module.scss';

const cx = classNames.bind(styles);
function NoteListLoading() {
    const noteListLoading = Array.from(Array(10).keys());
    return (
        <>
            {noteListLoading.map((note) => (
                <div key={note} className={cx('item', 'item__loading')}>
                    <div className={cx('skeleton')}></div>
                    <div className={cx('skeleton')}></div>
                    <div className={cx('skeleton')}></div>
                    <div className={cx('skeleton')}></div>
                    <div className={cx('skeleton')}></div>
                </div>
            ))}
        </>
    );
}

export default NoteListLoading;
