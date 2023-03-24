import { useState } from 'react';
import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import noteService from 'services/noteService';
import { search } from 'utils/ArrayUtils';
import { CheckIcon, NotebookDfIcon, NotebookIcon } from 'components/Icons';
import SearchInput from 'components/Input/SearchInput';
import ModalCreate from 'components/Modal/ModalCreate';
import { toastError, toastInfo } from 'components/Toast/toast';
import { ModalProps } from '.';

import styles from './NoteMore.module.scss';
const cx = classNames.bind(styles);

interface MoveProps extends ModalProps {
    action: string;
}

function ChangeNotebook({ note, action, isOpen, setIsOpen }: MoveProps) {
    const dispatch = useAppDispatch();
    const listNote = useAppSelector((state) => state.note.listNote);
    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const notebook = notebooks.find((notebook) => notebook._id === note.notebook);

    const [searchValue, setSearchValue] = useState('');
    const [selectMove, setSelectMove] = useState(notebook);

    const handleModalNotebook = async () => {
        if (!selectMove) return;
        const { name, _id } = selectMove;

        if (action === 'move') {
            try {
                const response = await noteService.update(note._id, { notebook: _id });
                dispatch(noteActions.updateNote(response));
                toastInfo(`Đã chuyển "${note.title || 'Không có tiêu đề'}" vào sổ tay" ${name}"`);
            } catch (error) {
                toastError(
                    `Không thể chuyển "${note.title || 'Không có tiêu đề'}" vào sổ tay" ${name}"`
                );
            }
        }

        if (action === 'copy') {
            const { content, isTrash, title } = note;
            try {
                const response = await noteService.create(_id, {
                    content,
                    title,
                    isTrash,
                    notebook: _id,
                    tags: note.tags.map((tag) => tag._id),
                });
                dispatch(noteActions.setListNote([response, ...listNote]));
                toastInfo(`Đã sao chép "${note.title || 'Không có tiêu đề'}"`);
            } catch (error) {
                toastError(`Không thể sao chép "${note.title || 'Không có tiêu đề'}"`);
            }
        }
    };

    return (
        <ModalCreate
            onSubmit={handleModalNotebook}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='Di chuyển ghi chú vào...'
            action='Xong'
            width='730px'
            disabled={notebook?._id === selectMove?._id}
        >
            <div className={cx('modal', 'modal--notebook')}>
                <div className={styles.searchInput}>
                    <SearchInput
                        value={searchValue}
                        setValue={setSearchValue}
                        placeholder='Tìm vị trí...'
                    />
                </div>
                <div className={styles.moveList}>
                    {search(notebooks, searchValue, 'name').map((notebook) => {
                        const Icon = notebook.isDefault ? NotebookDfIcon : NotebookIcon;
                        return (
                            <div
                                onClick={() => setSelectMove(notebook)}
                                className={cx('notebookItem', {
                                    notebookItem__active: selectMove?._id === notebook._id,
                                })}
                                key={notebook._id}
                            >
                                <div className={styles.notebookInfo}>
                                    {selectMove?._id === notebook._id ? (
                                        <CheckIcon className={styles.checkIcon} />
                                    ) : (
                                        <div className={styles.checkIcon}></div>
                                    )}
                                    <Icon className={styles.notebookIcon} />
                                    <span className={styles.notebookName}>{notebook.name}</span>
                                </div>
                                {notebook?._id === notebook._id && (
                                    <div className={styles.notebookCurrent}>(hiện tại)</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </ModalCreate>
    );
}

export default ChangeNotebook;
