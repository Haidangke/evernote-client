import trash from 'assets/svg/trash.svg';
import styles from './NoteListEmpty.module.scss';

function EmptyTrash() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src={trash} alt='Empty Trash' />
            </div>
            <div className={styles.title}>Thùng rác của bạn đã rỗng</div>
            <div className={styles.description}>
                Khi bạn có ghi chú nằm trong thùng rác, hãy bấm vào '...' để khôi phục hoặc xóa.
            </div>
        </div>
    );
}
export default EmptyTrash;
