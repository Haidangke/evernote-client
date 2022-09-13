import { memo, ReactElement, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import noteService from 'services/noteService';
import { Note, Tag } from 'types';
import Toast from 'components/Toast';
import TippyMore from 'components/Tippy/TippyMore';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import styles from './NoteMore.module.scss';
import { noteActions } from 'features/note/noteSlice';

function NoteMore() {
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const dispatch = useAppDispatch();

    // const listNote = useAppSelector((state) => state.note.listNote);
    // const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    // const notify = (content?: string) => toast.custom(<Toast content={content} />);

    const notify = (children?: ReactElement) => toast.custom(<Toast>{children}</Toast>);

    const handleMoveToTrash = useCallback(() => {
        if (!noteId) return;
        noteService.update(noteId, { isTrash: true }).then((note: Note<Tag>) => {
            dispatch(noteActions.updateNote(note));

            notify(
                <>
                    <span>Đã di chuyển "</span>
                    <span className={styles.value}> {note?.title || 'Chưa có tiêu đề'} </span>
                    <span>" vào </span> <span className={styles.address}> Thùng rác</span>
                </>
            );
        });
    }, [noteId]);
    return (
        <>
            <TippyMore
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

                        <div onClick={handleMoveToTrash} className={styles.item}>
                            Di chuyển vào thùng rác
                        </div>
                    </div>
                }
            />
            <Toaster />
        </>
    );
}

export default memo(NoteMore);
