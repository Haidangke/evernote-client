import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notebookActions } from 'features/notebook/notebookSlice';
import { InputField } from 'components/FormFields';
import ModalCreate from 'components/Modal/ModalCreate';
import { nameSchema } from 'components/FormFields/InputField';
import notebookService from 'services/notebookService';
import { FormAdd } from 'types';

interface NotebookAddProps {
    isModal: boolean;
    setIsModal: any;
}

export default function NotebookAdd({ isModal, setIsModal }: NotebookAddProps) {
    const email = useAppSelector((state) => state.auth.user?.email);
    const dispatch = useAppDispatch();

    const { notebooks } = useAppSelector((state) => state.notebook);
    const { control, handleSubmit, reset, watch } = useForm<FormAdd>({
        defaultValues: { name: '' },
        resolver: yupResolver(nameSchema),
    });

    const watchNameField = watch('name');

    const handleValid = useCallback(
        (name: string) => {
            return notebooks.some((notebook) => notebook.name === name);
        },
        [notebooks]
    );
    const handleFormSubmit = async (formValue: FormAdd) => {
        const notebook = formValue.name;
        if (!notebook) return;
        if (!handleValid(notebook) && email) {
            await notebookService.create({ name: notebook, creator: email });
            dispatch(notebookActions.fetch());
            reset({ name: '' });
            setIsModal(false);
        }
    };
    return (
        <ModalCreate
            title='Tạo sổ tay mới'
            description='Sổ tay giúp ích cho việc nhóm các ghi chú có chung chủ đề. Chúng có thể đặt trong chế độ riêng tư hoặc dùng chung.'
            isOpen={isModal}
            setIsOpen={setIsModal}
            onSubmit={handleSubmit(handleFormSubmit)}
            disabled={!watchNameField}
        >
            <InputField
                handleValid={handleValid}
                name='name'
                control={control}
                placeholder='Tên sổ tay'
                errorProp='Tên sổ tay đã có người dùng'
            />
        </ModalCreate>
    );
}
