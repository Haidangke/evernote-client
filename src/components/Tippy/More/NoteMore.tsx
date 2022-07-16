import More from '.';
import styles from './More.module.scss';

function NoteMore() {
    return (
        <More
            dropdown={
                <div className={styles.wrapper}>
                    <div className={styles.item}>Chia sẻ...</div>
                    <div className={styles.item}>Di chuyển...</div>
                    <div className={styles.item}>Sao chép đến...</div>
                    <div className={styles.item}>Sao đúp</div>

                    <div className={styles.lineThrough}></div>
                    <div className={styles.item}>Sửa thẻ...</div>
                    <div className={styles.lineThrough}></div>

                    <div className={styles.item}>Thêm vào lỗi tắt</div>
                    <div className={styles.item}>Sao chép liên kết nội bộ</div>

                    <div className={styles.lineThrough}></div>

                    <div className={styles.item}>Độ rộng ghi chú</div>
                    <div className={styles.item}>Thông tin của ghi chú</div>
                    <div className={styles.item}>Lịch sử ghi chú</div>

                    <div className={styles.lineThrough}></div>

                    <div className={styles.item}>Di chuyển vào thùng rác</div>
                </div>
            }
        />
    );
}

export default NoteMore;
