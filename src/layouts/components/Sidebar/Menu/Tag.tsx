import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TagIcon, TagSubIcon } from 'assets/icons';
import InputField from 'components/FormFields/InputField';
import ModalForm from 'components/Modal/ModalForm';
import tagService from 'services/tagService';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import MenuItem from '../Menu/MenuItem';
import { tagActions } from 'app/slice/tagSlice';

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
    const { listTag } = useAppSelector((state) => state.tag);
    const [isModal, setIsModal] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormTag>({
        defaultValues: { name: '' },
        resolver: yupResolver(schema),
    });

    const handleValid = useCallback(
        (name: string) => {
            return listTag.filter((tag) => tag.name === name).length > 0;
        },
        [listTag]
    );

    const handleFormSubmit = async (formValue: FormTag) => {
        const nameTag = formValue.name;

        if (!handleValid(nameTag)) {
            await tagService.create(nameTag);
            reset({ name: '' });
            setIsModal(false);
            dispatch(tagActions.fetch());
        }
    };

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
                <InputField
                    handleValid={handleValid}
                    name='name'
                    control={control}
                    placeholder='Tên thẻ'
                    errorProp='Tên thẻ này đã được sử dụng'
                />
            </ModalForm>
        </>
    );
}

export default memo(Tag);
