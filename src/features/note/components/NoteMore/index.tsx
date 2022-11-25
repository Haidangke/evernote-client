import { memo, ReactElement, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import noteService from 'services/noteService';
import { Note, Tag } from 'types';
import Toast from 'components/Toast';
import TippyMore from 'components/Tippy/TippyMore';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { noteActions } from 'features/note/noteSlice';
import { tagActions } from 'features/tag/tagSlice';

import styles from './NoteMore.module.scss';

interface NoteMoreProps {
    page?: string;
}

function NoteMore({ page }: NoteMoreProps) {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const notebooks = useAppSelector((state) => state.notebook.notebooks);

    const listNote = useAppSelector((state) => state.note.listNote);
    const note = listNote.find((note) => note._id === noteId);
    const notebook = notebooks.find((notebook) => notebook._id === note?.notebook);

    // const notify = (content?: string) => toast.custom(<Toast content={content} />);

    const handleMoveTrash = (isTrash: boolean) => {
        if (!noteId || !notebook) return;
        noteService.update(noteId, { isTrash }).then((note: Note<Tag>) => {
            dispatch(noteActions.updateNote(note));

            toast((t) => (
                <Toast toastId={t.id}>
                    <>
                        <span>Đã {isTrash ? 'di chuyển' : 'khôi phục'} "</span>
                        <span className={styles.value}> {note?.title || 'Chưa có tiêu đề'} </span>
                        <span>" {isTrash ? 'vào' : 'về'} </span>{' '}
                        <span className={styles.address}>
                            {isTrash ? 'Thùng rác' : notebook.name}
                        </span>
                    </>
                </Toast>
            ));
        });
    };
    return (
        <>
            <TippyMore
                dropdown={
                    page !== 'recycle' ? (
                        <div className={styles.wrapper}>
                            <div className={styles.item}>Di chuyển...</div>

                            <div className={styles.lineThrough}></div>

                            <div className={styles.item}>Sửa thẻ...</div>
                            <div className={styles.item}>Thêm vào lỗi tắt</div>
                            <div className={styles.item}>Thông tin của ghi chú</div>

                            <div className={styles.lineThrough}></div>

                            <div onClick={() => handleMoveTrash(true)} className={styles.item}>
                                Di chuyển vào thùng rác
                            </div>
                        </div>
                    ) : (
                        <div className={styles.wrapper}>
                            <div onClick={() => handleMoveTrash(false)} className={styles.item}>
                                Khôi phục ghi chú
                            </div>
                            <div className={styles.item}>Xóa vĩnh viễn</div>
                        </div>
                    )
                }
            />
        </>
    );
}

export default memo(NoteMore);
