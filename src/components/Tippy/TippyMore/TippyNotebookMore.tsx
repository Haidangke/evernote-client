import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Notebook } from 'types';
import useAddNote from 'hooks/useAddNote';
import InputField, { nameSchema } from 'components/FormFields/InputField';
import Toast from 'components/Toast';
import ModalForm from 'components/Modal/ModalForm';
import notebookService from 'services/notebookService';
import shortcutService from 'services/shortcutService';
import { notebookActions } from 'features/notebook/notebookSlice';
import { noteActions } from 'features/note/noteSlice';

import More from 'components/Tippy/TippyMore';
import { shortcutActions } from 'app/slice/shortcutSlice';

import styles from './TippyMore.module.scss';
const cx = classNames.bind(styles);

interface NotebookMoreProps {
    notebook: Notebook;
}

interface UpdateName {
    name: string;
}

function TippyNotebookMore({ notebook }: NotebookMoreProps) {
    const dispatch = useAppDispatch();
    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const listNote = useAppSelector((state) => state.note.listNote);
    const shortcuts = useAppSelector((state) => state.shortcut.shortcuts);
    const isShortcut = shortcuts.find((shortcut) => shortcut.type._id === notebook._id);

    const [isDelete, setIsDelete] = useState(false);
    const [isChangeName, setIsChangeName] = useState(false);

    const addNote = useAddNote(notebook._id);
    const notify = (content: string) => toast.custom(<Toast content={content} />);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<UpdateName>({
        defaultValues: { name: notebook.name },
        resolver: yupResolver(nameSchema),
    });

    const handleChangeName = useCallback(
        (value: UpdateName) => {
            notebookService
                .update(notebook._id, value)
                .then(() => {
                    const newNotebooks = [...notebooks];
                    const index = newNotebooks
                        .map((notebook) => notebook._id)
                        .indexOf(notebook._id);
                    const updatedAt = new Date().toISOString();
                    const notebookUpdate = { ...newNotebooks[index], name: value.name, updatedAt };
                    newNotebooks[index] = notebookUpdate;

                    dispatch(notebookActions.setNotebooks(newNotebooks));
                    reset({ name: value.name });
                    setIsChangeName(false);
                    toast.remove();
                    notify('Đã đổi tên sổ tay');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [dispatch, notebook._id, notebooks, reset]
    );

    const handleSetDefault = useCallback(() => {
        notebookService.update(notebook._id, { isDefault: true }).then(() => {
            const newNotebooks = [...notebooks].map((notebook) => ({
                ...notebook,
                isDefault: false,
            }));
            const index = newNotebooks.map((notebook) => notebook._id).indexOf(notebook._id);

            const notebookUpdate = { ...newNotebooks[index], isDefault: true };
            newNotebooks[index] = notebookUpdate;
            dispatch(notebookActions.setNotebooks(newNotebooks));

            toast.remove();
            notify(`Đã đặt "${notebook.name}" làm sổ tay mặc định của bạn`);
        });
    }, [dispatch, notebook._id, notebook.name, notebooks]);

    const handleDelete = useCallback(() => {
        notebookService.delete(notebook._id).then(() => {
            notify(`Đã xóa "${notebook.name}"`);

            const index = notebooks.map((notebook) => notebook.name).indexOf(notebook.name);
            const newNotebooks = [...notebooks];
            newNotebooks.splice(index, 1);
            dispatch(notebookActions.setNotebooks(newNotebooks));

            const newListNote = listNote.filter((note) => note.notebook !== notebook._id);
            dispatch(noteActions.setListNote(newListNote));

            setIsDelete(false);
        });
    }, [dispatch, listNote, notebook._id, notebook.name, notebooks]);

    const handleShortcut = () => {
        if (isShortcut) {
        } else {
            shortcutService
                .create({
                    type: { _id: notebook._id, name: 'notebook', value: 'b' },
                    name: notebook.name,
                })
                .then((data) => {
                    const newShortcuts = [...shortcuts, data];
                    dispatch(shortcutActions.setShortcuts(newShortcuts));

                    toast.remove();
                    notify(`Đã thêm "${data.name}" vào lỗi tắt`);
                });
        }
    };

    return (
        <>
            <More
                dropdown={
                    <div className={styles.wrapper}>
                        <div className={styles.item} onClick={addNote}>
                            Thêm ghi chú mới
                        </div>
                        <div className={styles.item}>Chia sẻ sổ tay..</div>
                        <div className={styles.item} onClick={() => setIsChangeName(true)}>
                            Đổi tên sổ tay
                        </div>
                        <button
                            disabled={notebook.isDefault}
                            onClick={() => setIsDelete(true)}
                            className={cx('item', {
                                item__disable: notebook.isDefault,
                            })}
                        >
                            Xóa sổ tay
                        </button>

                        <div className={styles.lineThrough}></div>

                        <div className={styles.item} onClick={handleShortcut}>
                            {isShortcut ? 'Xóa khỏi ' : 'Thêm vào '}
                            Lối tắt
                        </div>
                        {!notebook.isDefault && (
                            <div onClick={handleSetDefault} className={styles.item}>
                                Đặt là sổ tay mặc định
                            </div>
                        )}
                        <div className={styles.item}>Thêm vào chồng sổ tay</div>
                    </div>
                }
            />
            <ModalForm
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                onSubmit={handleDelete}
                title='Xóa sổ tay?'
                variant='danger'
                content='Xóa'
                description='Mọi ghi chú trong sổ tay sẽ được di chuyển vào Thùng rác. Thao tác này không thể hồi lại được.'
            />

            <ModalForm
                isOpen={isChangeName}
                setIsOpen={setIsChangeName}
                onSubmit={handleSubmit(handleChangeName)}
                title='Đổi tên sổ tay'
                variant='primary'
                content='Tiếp tục'
                isSmall={true}
                disabled={!isDirty}
            >
                <InputField
                    name='name'
                    control={control}
                    placeholder='Tên sổ tay'
                    errorProp='Tên sổ tay này đã được sử dụng'
                />
            </ModalForm>

            <Toaster />
        </>
    );
}

export default TippyNotebookMore;
