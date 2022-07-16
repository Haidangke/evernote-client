import { useState } from 'react';
import classNames from 'classnames/bind';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Notebook } from 'types';
import More from '.';
import useAddNote from 'hooks/useAddNote';
import InputField, { nameSchema } from 'components/FormFields/InputField';
import Toast from 'components/Toast';
import ModalForm from 'components/Modal/ModalForm';
import notebookService from 'services/notebookService';
import { notebookActions } from 'app/slice/notebookSlice';

import styles from './More.module.scss';
const cx = classNames.bind(styles);

interface NotebookMoreProps {
    notebook: Notebook;
}

function NotebookMore({ notebook }: NotebookMoreProps) {
    const dispatch = useAppDispatch();
    const notebooks = useAppSelector((state) => state.notebook.notebooks);

    const [isDelete, setIsDelete] = useState(false);
    const [isChangeName, setIsChangeName] = useState(false);

    const addNote = useAddNote(notebook._id);
    const notify = () => toast.custom(<Toast content='Đã xóa "sổ tay"' />);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<{ name: string }>({
        defaultValues: { name: notebook.name },
        resolver: yupResolver(nameSchema),
    });

    return (
        <>
            <More
                dropdown={
                    <div className={cx('wrapper')}>
                        <div className={cx('item')} onClick={addNote}>
                            Thêm ghi chú mới
                        </div>
                        <div className={cx('item')}>Chia sẽ sổ tay..</div>
                        <div className={cx('item')} onClick={() => setIsChangeName(true)}>
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

                        <div className={cx('lineThrough')}></div>

                        <div className={cx('item')}>Thêm vào lỗi tắt</div>
                        <div className={cx('item')}>Đặt là sổ tay mặc định</div>
                        <div className={cx('item')}>Thêm vào chồng sổ tay</div>
                    </div>
                }
            />
            <ModalForm
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                onSubmit={() => {
                    notebookService.delete(notebook._id).then(() => {
                        notify();

                        const index = notebooks
                            .map((notebook) => notebook.name)
                            .indexOf(notebook.name);
                        const newNotebooks = [...notebooks];
                        newNotebooks.splice(index, 1);
                        dispatch(notebookActions.setNotebooks(newNotebooks));

                        setIsDelete(false);
                    });
                }}
                title='Xóa sổ tay?'
                variant='danger'
                content='Xóa'
                description='Mọi ghi chú trong sổ tay sẽ được di chuyển vào Thùng rác. Thao tác này không thể hồi lại được.'
            />

            <ModalForm
                isOpen={isChangeName}
                setIsOpen={setIsChangeName}
                onSubmit={() => {}}
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

export default NotebookMore;
