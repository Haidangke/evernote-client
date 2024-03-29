import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Notebook } from 'types';
import useAddNote from 'hooks/useAddNote';
import notebookService from 'services/notebookService';
import { notebookActions } from 'features/notebook/notebookSlice';
import { noteActions } from 'features/note/noteSlice';

import InputField, { nameSchema } from 'components/FormFields/InputField';
import ModalCreate from 'components/Modal/ModalCreate';
import Toast from 'components/Toast';
import TippyMore from 'components/Tippy/TippyMore';

import styles from './NotebookMore.module.scss';
const cx = classNames.bind(styles);

interface NotebookMoreProps {
    notebook: Notebook;
}

interface UpdateName {
    name: string;
}

function NotebookMore({ notebook }: NotebookMoreProps) {
    const dispatch = useAppDispatch();
    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const listNote = useAppSelector((state) => state.note.listNote);

    const [isDelete, setIsDelete] = useState(false);
    const [isChangeName, setIsChangeName] = useState(false);
    const [isMore, setIsMore] = useState(false);

    const closeMore = () => setIsMore(false);

    const addNote = useAddNote(notebook._id);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty },
        watch,
    } = useForm<UpdateName>({
        defaultValues: { name: notebook.name },
        resolver: yupResolver(nameSchema),
    });
    const watchNameField = watch('name');

    const handleChangeName = useCallback(
        (value: UpdateName) => {
            closeMore();
            setIsChangeName(false);
            notebookService.update(notebook._id, value).then((data) => {
                dispatch(notebookActions.updateNotebook(data));
                reset({ name: value.name });

                toast.dismiss();

                toast((t) => <Toast toastId={t.id} content='Đã đổi tên sổ tay' />);
            });
        },
        [dispatch, notebook._id, reset]
    );

    const handleSetDefault = useCallback(() => {
        closeMore();
        notebookService.update(notebook._id, { isDefault: true }).then((data) => {
            dispatch(notebookActions.updateNotebook(data));

            toast.dismiss();
            toast((t) => (
                <Toast
                    toastId={t.id}
                    content={`Đã đặt "${notebook.name}" làm sổ tay mặc định của bạn`}
                />
            ));
        });
    }, [dispatch, notebook._id, notebook.name]);

    const handleDelete = useCallback(() => {
        closeMore();
        setIsDelete(false);
        notebookService.delete(notebook._id).then(() => {
            const index = notebooks.map((notebook) => notebook.name).indexOf(notebook.name);
            const newNotebooks = [...notebooks];
            newNotebooks.splice(index, 1);
            dispatch(notebookActions.setNotebooks(newNotebooks));

            const newListNote = listNote.filter((note) => note.notebook !== notebook._id);
            dispatch(noteActions.setListNote(newListNote));

            toast.dismiss();
            toast((t) => <Toast toastId={t.id} content={`Đã xóa "${notebook.name}"`} />);
        });
    }, [dispatch, listNote, notebook._id, notebook.name, notebooks]);

    const handleShortcut = () => {
        closeMore();
        if (notebook.isShortcut) return;
        notebookService.update(notebook._id, { isShortcut: true }).then((data) => {
            dispatch(notebookActions.updateNotebook(data));

            toast.dismiss();
            toast((t) => (
                <Toast toastId={t.id} content={`Đã thêm "${notebook.name}" vào lỗi tắt`} />
            ));
        });
    };

    return (
        <>
            <TippyMore
                isMore={isMore}
                setIsMore={setIsMore}
                dropdown={
                    <div className={styles.wrapper}>
                        <div className={styles.item} onClick={addNote}>
                            Thêm ghi chú mới
                        </div>
                        <div className={styles.item}>Chia sẻ sổ tay..</div>
                        <div className={styles.item} onClick={() => setIsChangeName(true)}>
                            Đổi tên sổ tay
                        </div>
                        <div
                            onClick={() => {
                                if (!notebook.isDefault) setIsDelete(true);
                            }}
                            className={cx('item', {
                                item__disable: notebook.isDefault,
                            })}
                        >
                            Xóa sổ tay
                        </div>

                        <div className={styles.lineThrough}></div>

                        <div className={styles.item} onClick={handleShortcut}>
                            {notebook.isShortcut ? 'Xóa khỏi ' : 'Thêm vào '}
                            Lối tắt
                        </div>
                        {!notebook.isDefault && (
                            <div onClick={handleSetDefault} className={styles.item}>
                                Đặt là sổ tay mặc định
                            </div>
                        )}
                        {/* <div className={styles.item}>Thêm vào chồng sổ tay</div> */}
                    </div>
                }
            />
            <ModalCreate
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                onSubmit={handleDelete}
                title='Xóa sổ tay?'
                variant='danger'
                action='Xóa'
                description='Mọi ghi chú trong sổ tay sẽ bị xóa vĩnh viễn. Thao tác này không thể hồi lại được.'
            />

            <ModalCreate
                isOpen={isChangeName}
                setIsOpen={setIsChangeName}
                onSubmit={handleSubmit(handleChangeName)}
                title='Đổi tên sổ tay'
                variant='primary'
                action='Tiếp tục'
                isSmall={true}
                disabled={!isDirty || !watchNameField}
            >
                <InputField
                    name='name'
                    control={control}
                    placeholder='Tên sổ tay'
                    errorProp='Tên sổ tay này đã được sử dụng'
                />
            </ModalCreate>
        </>
    );
}

export default NotebookMore;
