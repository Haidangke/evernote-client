import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotebookIcon, NotebookSubDfIcon, NotebookSubIcon } from 'assets/icons';
import { InputField } from 'components/FormFields';
import ModalForm from 'components/Modal/ModalForm';
import MenuItem from './MenuItem';
import notebookService from 'services/notebookService';
import { notebookActions } from 'app/slice/notebookSlice';

interface FormNotebook {
    name: string;
}

const schema = yup
    .object()
    .shape({
        name: yup
            .string()
            .required('Tên của sổ tay phải có độ dài tối thiểu 1')
            .min(1, 'Tên của sổ tay phải có độ dài tối thiểu 1')
            .max(30, 'Tên của sổ tay chỉ có độ dài tối đa 30'),
    })
    .required();

function Notebook() {
    const email = useAppSelector((state) => state.auth.user?.email);
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const { notebooks } = useAppSelector((state) => state.notebook);
    const { control, handleSubmit, reset } = useForm<FormNotebook>({
        defaultValues: { name: '' },
        resolver: yupResolver(schema),
    });

    const handleValid = useCallback(
        (name: string) => {
            return notebooks.some((notebook) => notebook.name === name);
        },
        [notebooks]
    );

    const handleFormSubmit = async (formValue: FormNotebook) => {
        const notebook = formValue.name;
        if (!handleValid(notebook) && email) {
            await notebookService.create({ name: notebook, creator: email });
            dispatch(notebookActions.fetch());
            reset({ name: '' });
            setIsModal(false);
        }
    };
    return (
        <>
            <MenuItem
                value='notebook'
                name='Sổ tay'
                path='/notebook'
                icon={NotebookIcon}
                types={['link', 'menu']}
                onAdd={() => {
                    setIsModal(true);
                }}
                items={
                    notebooks.length === 0
                        ? []
                        : notebooks.map((notebook) => ({
                              name: notebook.name,
                              icon: notebook.isDefault ? NotebookSubDfIcon : NotebookSubIcon,
                          }))
                }
            />
            <ModalForm
                title='Tạo sổ tay mới'
                description='Sổ tay giúp ích cho việc nhóm các ghi chú có chung chủ đề. Chúng có thể đặt trong chế độ riêng tư hoặc dùng chung.'
                isOpen={isModal}
                setIsOpen={setIsModal}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <InputField
                    handleValid={handleValid}
                    name='name'
                    control={control}
                    placeholder='Tên sổ tay'
                    errorProp='Tên sổ tay đã có người dùng'
                />
            </ModalForm>
        </>
    );
}

export default Notebook;
