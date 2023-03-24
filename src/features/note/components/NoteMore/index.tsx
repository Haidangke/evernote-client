import { memo, useState } from 'react';
import { toast } from 'react-hot-toast';

import noteService from 'services/noteService';
import Toast from 'components/Toast';
import TippyMore from 'components/Tippy/TippyMore';
import ModalCreate from 'components/Modal/ModalCreate';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { noteActions } from 'features/note/noteSlice';
// import { shortcutActions } from 'features/shortcut/shortcutSlice';
// import shortcutService from 'services/shortcutService';

import { toastChildren, toastError, toastInfo } from 'components/Toast/toast';
import { Note, Tag } from 'types';
import ChangeNotebook from './ChangeNotebook';
import useLocationPage from 'hooks/useLocationPage';
import ChangeTag from './ChangeTag';

import styles from './NoteMore.module.scss';

export interface ModalProps {
    note: Note<Tag>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface NoteMoreProps {
    note: Note<Tag>;
}

function NoteMore({ note }: NoteMoreProps) {
    const dispatch = useAppDispatch();
    const page = useLocationPage();

    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const listNote = useAppSelector((state) => state.note.listNote);
    // const shortcuts = useAppSelector((state) => state.shortcut.shortcuts);

    const notebook = notebooks.find((notebook) => notebook._id === note.notebook);

    // const isShortcut = shortcuts.find((shortcut) => shortcut.type._id === curNote?._id);

    const [isModal, setIsModal] = useState(false);
    const [isMore, setIsMore] = useState(false);

    const [action, setAction] = useState('');
    const [isModalNotebook, setIsModalNotebook] = useState(false);
    const [isChangeTag, setIsChangeTag] = useState(false);

    const handleMoveTrash = async (isTrash: boolean) => {
        setIsMore(false);
        if (!notebook) return;
        try {
            const response = await noteService.update(note._id, { isTrash });
            dispatch(noteActions.updateNote(response));
            toastChildren(
                <>
                    <span>Đã {isTrash ? 'di chuyển' : 'khôi phục'} "</span>
                    <span className={styles.value}> {response.title || 'Chưa có tiêu đề'} </span>
                    <span>" {isTrash ? 'vào' : 'về'} </span>{' '}
                    <span className={styles.address}>{isTrash ? 'Thùng rác' : notebook.name}</span>
                </>
            );
        } catch (error) {
            toastError('Lỗi khi di chuyển ghi chú vào thùng rác');
        }
    };

    const handleAddShortcut = async () => {
        setIsMore(false);
        if (!note) return;
        const isShortcut = note.isShortcut;
        try {
            const response = await noteService.update(note._id, { isShortcut: !isShortcut });
            dispatch(noteActions.updateNote(response));
            toastInfo(
                `Đã ${response.isShortcut ? 'xóa' : 'thêm'} "${response.title}" khỏi lối tắt`
            );
        } catch (error) {
            toastError(`Gặp lỗi khi ${isShortcut ? 'xóa' : 'thêm'} "${note.title}" khỏi lỗi tắt`);
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

    const handleMoveNote = () => {
        setIsModalNotebook(true);
        setAction('move');
    };
    const handleCopyNote = () => {
        setIsModalNotebook(true);
        setAction('copy');
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
                            <div onClick={handleMoveNote} className={styles.item}>
                                Di chuyển...
                            </div>
                            <div onClick={handleCopyNote} className={styles.item}>
                                Sao chép đến...
                            </div>
                            <div className={styles.lineThrough}></div>

                            <div onClick={() => setIsChangeTag(true)} className={styles.item}>
                                Sửa thẻ...
                            </div>
                            <div onClick={handleAddShortcut} className={styles.item}>
                                {note.isShortcut ? 'Xóa khỏi lối tắt' : 'Thêm vào lối tắt'}
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

            <ChangeNotebook
                note={note}
                action={action}
                isOpen={isModalNotebook}
                setIsOpen={setIsModalNotebook}
            />

            <ChangeTag note={note} isOpen={isChangeTag} setIsOpen={setIsChangeTag} />
        </>
    );
}

export default memo(NoteMore);
