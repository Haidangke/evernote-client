import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotebookIcon, NotebookSubDfIcon, NotebookSubIcon } from 'assets/icons';
import { InputField } from 'components/FormFields';
import ModalForm from 'components/Modal/ModalForm';
import MenuItem from './MenuItem';
import notebookService from 'services/notebookService';
import { notebookActions } from 'features/notebook/notebookSlice';
import { nameSchema } from 'components/FormFields/InputField';

interface FormNotebook {
    name: string;
}

function Notebook() {
    const email = useAppSelector((state) => state.auth.user?.email);
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const { notebooks } = useAppSelector((state) => state.notebook);
    const { control, handleSubmit, reset } = useForm<FormNotebook>({
        defaultValues: { name: '' },
        resolver: yupResolver(nameSchema),
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
                navigate={{ path: '/notebooks' }}
                topic={{ title: 'Sổ tay', value: 'notebook' }}
                icon={{ main: NotebookIcon }}
                types={['link', 'menu']}
                onAdd={() => setIsModal(true)}
                items={
                    notebooks.length === 0
                        ? []
                        : notebooks.map((notebook) => ({
                              _id: notebook._id,
                              name: notebook.name,
                              icon: notebook.isDefault ? NotebookSubDfIcon : NotebookSubIcon,
                              type: {
                                  name: 'notebook',
                                  value: 'b',
                              },
                              navigate: {
                                  params: {
                                      an: true,
                                  },
                              },
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
