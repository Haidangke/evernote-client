import { memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import classNames from 'classnames/bind';

import noteService from 'services/noteService';
import { Note, Tag } from 'types';
import Toast from 'components/Toast';
import TippyMore from 'components/Tippy/TippyMore';
import ModalCreate from 'components/Modal/ModalCreate';
import SearchInput from 'components/Input/SearchInput';
import { CheckIcon, NotebookIcon, NotebookDfIcon } from 'components/Icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { search } from 'utils/ArrayUtils';

import { noteActions } from 'features/note/noteSlice';
// import { shortcutActions } from 'features/shortcut/shortcutSlice';
// import shortcutService from 'services/shortcutService';

import styles from './NoteMore.module.scss';
import { getFCMToken } from 'firebase-config';
const cx = classNames.bind(styles);

interface NoteMoreProps {
    page?: string;
    noteId?: string;
}

function NoteMore({ page, noteId }: NoteMoreProps) {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const noteIdParams = noteId || searchParams.get('n');

    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const listNote = useAppSelector((state) => state.note.listNote);
    // const shortcuts = useAppSelector((state) => state.shortcut.shortcuts);

    const curNote = listNote.find((note) => note._id === noteIdParams);
    const curNotebook = notebooks.find((notebook) => notebook._id === curNote?.notebook);

    // const isShortcut = shortcuts.find((shortcut) => shortcut.type._id === curNote?._id);

    const [isModal, setIsModal] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const [isModalNotebook, setIsModalNotebook] = useState(false);
    const [searchMove, setSearchMove] = useState('');
    const [selectMove, setSelectMove] = useState(curNotebook);
    const [action, setAction] = useState<'move' | 'copy' | null>(null);

    const handleMoveTrash = (isTrash: boolean) => {
        setIsMore(false);
        if (!noteIdParams || !curNotebook) return;
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
                            {isTrash ? 'Thùng rác' : curNotebook.name}
                        </span>
                    </>
                </Toast>
            ));
        });
    };

    const handleAddShortcut = () => {
        setIsMore(false);
        if (!curNote) return;
        if (curNote.isShortcut) {
            noteService.update(curNote._id, { isShortcut: false }).then((data) => {
                // const newShortcuts = [...shortcuts].filter(
                //     (shortcut) => shortcut._id !== isShortcut._id
                // );
                dispatch(noteActions.updateNote(data));
                toast.remove();
                toast((t) => (
                    <Toast toastId={t.id} content={`Đã xóa "${curNote.title}" khỏi lối tắt`} />
                ));
            });
        } else {
            noteService.update(curNote._id, { isShortcut: true }).then((data) => {
                // const newShortcuts = [...shortcuts, data];
                // dispatch(shortcutActions.setShortcuts(newShortcuts));
                dispatch(noteActions.updateNote(data));

                toast.remove();
                toast((t) => (
                    <Toast toastId={t.id} content={`Đã thêm "${curNote.title}" vào lỗi tắt`} />
                ));
            });
        }
    };

    const handleDeleteNote = () => {
        setIsMore(false);
        if (!curNote) return;
        noteService.delete(curNote._id).then(() => {
            toast.remove();
            const newListNote = listNote.filter((item) => item._id !== curNote._id);
            dispatch(noteActions.setListNote(newListNote));

            toast((t) => (
                <Toast
                    toastId={t.id}
                    content={`Đã xóa "${curNote.title || 'Không có tiêu đề'}" khỏi thùng rác`}
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

    const handleModalNotebook = () => {
        if (!curNote || !action) return;

        if (action === 'move') {
            noteService
                .update(curNote._id, {
                    notebook: selectMove?._id,
                })
                .then((data) => {
                    toast.remove();
                    dispatch(noteActions.updateNote(data));

                    toast((t) => (
                        <Toast
                            toastId={t.id}
                            content={`Đã chuyển "${
                                curNote.title || 'Không có tiêu đề'
                            }" vào sổ tay" ${selectMove?.name}"`}
                        />
                    ));
                });
        }

        if (action === 'copy' && selectMove?._id) {
            noteService
                .create(selectMove._id, {
                    contain: curNote.contain,
                    content: curNote.content,
                    createdAt: curNote.createdAt,
                    isTrash: curNote.isTrash,
                    tags: curNote.tags.map((tag) => tag._id),
                    title: curNote.title,
                })
                .then((data) => {
                    dispatch(noteActions.setListNote([data, ...listNote]));
                });
        }
    };

    const handleReminder = async () => {
        const token = await getFCMToken();
        const date = new Date(2023, 2, 16, 10, 53, 0);
        if (noteIdParams) {
            noteService
                .update(noteIdParams, { reminder: date, token })
                .then((data) => {
                    console.log({ noteUpdate: data });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                            <div onClick={handleReminder} className={styles.item}>
                                Nhac nho
                            </div>
                            <div onClick={handleMoveNote} className={styles.item}>
                                Di chuyển...
                            </div>
                            <div onClick={handleCopyNote} className={styles.item}>
                                Sao chép đến...
                            </div>
                            <div className={styles.lineThrough}></div>

                            <div className={styles.item}>Sửa thẻ...</div>
                            <div onClick={handleAddShortcut} className={styles.item}>
                                {curNote?.isShortcut ? 'Xóa khỏi lối tắt' : 'Thêm vào lối tắt'}
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

            <ModalCreate
                onSubmit={handleModalNotebook}
                isOpen={isModalNotebook}
                setIsOpen={setIsModalNotebook}
                title='Di chuyển ghi chú vào...'
                action='Xong'
                width='730px'
                disabled={curNotebook?._id === selectMove?._id}
            >
                <div className={styles.move}>
                    <div className={styles.searchInput}>
                        <SearchInput
                            value={searchMove}
                            setValue={setSearchMove}
                            placeholder='Tìm vị trí...'
                        />
                    </div>
                    <div className={styles.moveList}>
                        {search(notebooks, searchMove, 'name').map((notebook) => {
                            const Icon = notebook.isDefault ? NotebookDfIcon : NotebookIcon;
                            return (
                                <div
                                    onClick={() => setSelectMove(notebook)}
                                    className={cx('moveItem', {
                                        moveItem__active: selectMove?._id === notebook._id,
                                    })}
                                    key={notebook._id}
                                >
                                    <div className={styles.moveInfo}>
                                        {selectMove?._id === notebook._id ? (
                                            <CheckIcon className={styles.checkIcon} />
                                        ) : (
                                            <div className={styles.checkIcon}></div>
                                        )}
                                        <Icon className={styles.notebookIcon} />
                                        <span className={styles.moveName}>{notebook.name}</span>
                                    </div>
                                    {curNotebook?._id === notebook._id && (
                                        <div className={styles.moveCurrent}>(hiện tại)</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ModalCreate>
        </>
    );
}

export default memo(NoteMore);
