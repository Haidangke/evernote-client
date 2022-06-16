import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TagIcon, TagSubIcon } from '~/assets/icons';
import InputField from '~/components/FormFields/InputField';
import ModalForm from '~/components/Modal/ModalForm';
import tagService from '~/services/tagService';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { fetchListTag } from '~/app/thunk/listTagThunk';
import MenuItem from '../Menu/MenuItem';

interface FormTag {
    name: string;
}

const schema = yup
    .object()
    .shape({
        name: yup
            .string()
            .required('Trường tên của thẻ phải có độ dài tối thiểu 1')
            .min(1, 'Trường tên của thẻ phải có độ dài tối thiểu 1')
            .max(30, 'Trường tên của thẻ chỉ có độ dài tối đa 30'),
    })
    .required();

function Tag() {
    const dispatch = useAppDispatch();
    const { listTag } = useAppSelector((state) => state.listTag);
    const [isModal, setIsModal] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormTag>({
        defaultValues: { name: '' },
        resolver: yupResolver(schema),
    });

    const isValid = useCallback(
        (name: string) => {
            return listTag.filter((tag) => tag.name === name).length > 0;
        },
        [listTag]
    );

    const handleFormSubmit = async (formValue: FormTag) => {
        const nameTag = formValue.name;

        if (!isValid(nameTag)) {
            await tagService.create(nameTag);
            reset({ name: '' });
            setIsModal(false);
            dispatch(fetchListTag());
        }
    };

    useEffect(() => {
        dispatch(fetchListTag());
    }, [dispatch]);

    return (
        <>
            <MenuItem
                name='Thẻ'
                value='tag'
                icon={TagIcon}
                addIcon={TagSubIcon}
                types={['menu', 'sidebar']}
                onAdd={() => setIsModal(true)}
                items={
                    listTag.length === 0
                        ? []
                        : listTag.map((tag) => ({ name: tag.name, icon: TagSubIcon }))
                }
            />
            <ModalForm
                isCenter
                title='Tạo thẻ mới'
                description='Dùng thẻ để bổ sung từ khóa vào ghi chú, giúp bạn dễ dàng tìm kiếm và duyệt xem hơn.'
                isOpen={isModal}
                setIsOpen={setIsModal}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <InputField isValid={isValid} name='name' control={control} placeholder='Tên thẻ' />
            </ModalForm>
        </>
    );
}

export default Tag;
