import useAddNote from 'hooks/useAddNote';
import { useAppSelector } from 'app/hooks';

import create_note from 'assets/images/create_note';
import styles from './Create.module.scss';

interface CreateProps {
    notebookId?: string;
}

function Create({ notebookId }: CreateProps) {
    const { isFetching } = useAppSelector((state) => state.note);
    const { notebooks } = useAppSelector((state) => state.notebook);
    const notebookDfId = notebooks.find((notebook) => notebook.isDefault)?._id;

    const id = notebookId || notebookDfId;

    const handleAddNote = useAddNote(id);
    if (isFetching) return <></>;
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>{create_note}</div>
            <div className={styles.title}>Tất cả bắt đầu với các ghi chú</div>
            <div className={styles.description}>
                Bấm vào nút
                <span
                    onClick={() => {
                        if (id) handleAddNote();
                    }}
                >
                    + Ghi chú mới
                </span>
                ở dải tiện ích để tạo ghi chú.
            </div>
        </div>
    );
}

export default Create;
