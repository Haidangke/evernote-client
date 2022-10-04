import { MdDelete } from 'react-icons/md';

import styles from './EmptyTrash.module.scss';

function EmptyTrasg() {
    return (
        <div className={styles.wrapper}>
            <MdDelete color='rgb(217,217,217)' />
            <div className={styles.notify}>Thùng rác của bạn đã rỗng</div>
            <div className={styles.desc}>
                Khi bạn có ghi chú nằm trong thùng rác, hãy bấm vào '...' để khôi phục hoặc xóa.
            </div>
        </div>
    );
}
export default EmptyTrasg;
