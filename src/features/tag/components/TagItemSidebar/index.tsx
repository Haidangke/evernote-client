import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import InputField, { nameSchema } from 'components/FormFields/InputField';
import ModalCreate from 'components/Modal/ModalCreate';
import SidebarMenuItem from 'features/sidebar/components/Menu/MenuItem';
import { tagActions } from 'features/tag/tagSlice';
import tagService from 'services/tagService';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddTagOutlineIcon, TagIcon, TagSubIcon } from 'components/Icons';
import { FormAdd } from 'types';

function TagItemSidebar() {
    const dispatch = useAppDispatch();
    const { listTag } = useAppSelector((state) => state.tag);
    const [isModal, setIsModal] = useState(false);

    const { control, handleSubmit, reset, watch } = useForm<FormAdd>({
        defaultValues: { name: '' },
        resolver: yupResolver(nameSchema),
    });

    const watchNameField = watch('name');

    const handleValid = useCallback(
        (name: string) => {
            return listTag.filter((tag) => tag.name === name.trim()).length > 0;
        },
        [listTag]
    );

    const handleFormSubmit = async (formValue: FormAdd) => {
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
            <SidebarMenuItem
                topic={{ title: 'Thẻ', value: 'tag' }}
                icon={{ main: TagIcon, add: AddTagOutlineIcon }}
                types={['menu', 'slide']}
                onAdd={() => setIsModal(true)}
                menuSubs={[
                    {
                        _id: '1',
                        data:
                            listTag.length === 0
                                ? []
                                : listTag.map((tag) => ({
                                      _id: tag._id,
                                      name: tag.name,
                                      icon: TagSubIcon,
                                      type: { name: 'tag', value: 't' },
                                  })),
                    },
                ]}
            />
            <ModalCreate
                title='Tạo thẻ mới'
                description='Dùng thẻ để bổ sung từ khóa vào ghi chú, giúp bạn dễ dàng tìm kiếm và duyệt xem hơn.'
                isOpen={isModal}
                setIsOpen={setIsModal}
                onSubmit={handleSubmit(handleFormSubmit)}
                disabled={!watchNameField}
            >
                <InputField
                    handleValid={handleValid}
                    name='name'
                    control={control}
                    placeholder='Tên thẻ'
                    errorProp='Tên thẻ này đã được sử dụng'
                />
            </ModalCreate>
        </>
    );
}

export default memo(TagItemSidebar);
