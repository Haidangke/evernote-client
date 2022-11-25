import filter_note from 'assets/svg/filter_note.svg';
import styles from './NoteListEmpty.module.scss';

function EmptyFilter() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src={filter_note} alt='Empty Filter' />
            </div>
            <div className={styles.title}>Không tìm thấy ghi chú nào</div>
            <div className={styles.description}>Thử dùng một từ khóa hoặc bộ lọc khác.</div>
        </div>
    );
}

export default EmptyFilter;
