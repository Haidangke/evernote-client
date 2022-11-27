import { memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import noteService from 'services/noteService';
import { Note, Tag } from 'types';
import Toast from 'components/Toast';
import TippyMore from 'components/Tippy/TippyMore';
import ModalCreate from 'components/Modal/ModalCreate';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { shortcutActions } from 'features/shortcut/shortcutSlice';
import { noteActions } from 'features/note/noteSlice';
import shortcutService from 'services/shortcutService';

import styles from './NoteMore.module.scss';

interface NoteMoreProps {
    page?: string;
    noteId?: string;
}

function NoteMore({ page, noteId }: NoteMoreProps) {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const noteIdParams = noteId || searchParams.get('n');

    const [isModal, setIsModal] = useState(false);
    const [isMore, setIsMore] = useState(false);

    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const listNote = useAppSelector((state) => state.note.listNote);
    const shortcuts = useAppSelector((state) => state.shortcut.shortcuts);

    const note = listNote.find((note) => note._id === noteIdParams);
    const notebook = notebooks.find((notebook) => notebook._id === note?.notebook);

    const isShortcut = shortcuts.find((shortcut) => shortcut.type._id === note?._id);

    const handleMoveTrash = (isTrash: boolean) => {
        setIsMore(false);
        if (!noteIdParams || !notebook) return;
        noteService.update(noteIdParams, { isTrash }).then((note: Note<Tag>) => {
            dispatch(noteActions.updateNote(note));
            toast.remove();
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

    const handleAddShortcut = () => {
        setIsMore(false);
        if (!note) return;
        if (isShortcut) {
            shortcutService.delete(isShortcut._id).then(() => {
                console.log('xoa thanh cong');
                const newShortcuts = [...shortcuts].filter(
                    (shortcut) => shortcut._id !== isShortcut._id
                );
                dispatch(shortcutActions.setShortcuts(newShortcuts));
                toast.remove();
                toast((t) => (
                    <Toast toastId={t.id} content={`Đã xóa "${isShortcut.name}" khỏi lối tắt`} />
                ));
            });
        } else {
            shortcutService
                .create({
                    type: { _id: note._id, name: 'note', value: 'n' },
                    name: note.title || 'Chưa có tiêu đề',
                })
                .then((data) => {
                    const newShortcuts = [...shortcuts, data];
                    dispatch(shortcutActions.setShortcuts(newShortcuts));

                    toast.remove();
                    toast((t) => (
                        <Toast toastId={t.id} content={`Đã thêm "${data.name}" vào lỗi tắt`} />
                    ));
                });
        }
    };

    const handleDeleteNote = () => {
        setIsMore(false);
        if (!note) return;
        noteService.delete(note._id).then(() => {
            toast.remove();
            const newListNote = listNote.filter((item) => item._id !== note._id);
            dispatch(noteActions.setListNote(newListNote));

            toast((t) => (
                <Toast
                    toastId={t.id}
                    content={`Đã xóa "${note.title || 'Không có tiêu đề'}" khỏi thùng rác`}
                />
            ));
        });
    };

    return (
        <>
            <TippyMore
                className={styles.popper}
                isMore={isMore}
                setIsMore={setIsMore}
                dropdown={
                    page !== 'recycle' ? (
                        <div className={styles.wrapper}>
                            {/* <div className={styles.item}>Di chuyển...</div> */}

                            {/* <div className={styles.lineThrough}></div> */}

                            <div className={styles.item}>Sửa thẻ...</div>
                            <div onClick={handleAddShortcut} className={styles.item}>
                                {isShortcut ? 'Xóa khỏi lối tắt' : 'Thêm vào lối tắt'}
                            </div>
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
                            <div onClick={() => setIsModal(true)} className={styles.item}>
                                Xóa vĩnh viễn
                            </div>
                        </div>
                    )
                }
            />
            <ModalCreate
                onSubmit={handleDeleteNote}
                isOpen={isModal}
                setIsOpen={setIsModal}
                title='Xóa ghi chú'
                description={`Lưu ý: Ghi chú sẽ vĩnh viễn không còn nữa. Ngay cả Noteke cũng không thể hồi lại hành động này được`}
                variant='danger'
                action='Vẫn xóa'
            />
        </>
    );
}

export default memo(NoteMore);
