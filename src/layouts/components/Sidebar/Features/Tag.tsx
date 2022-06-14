import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '~/components/FormFields/InputField';
import { TagIcon } from '~/components/Icon';
import ModalForm from '~/components/Modal/ModalForm';
import Sticky from '../Sticky';

interface FormTag {
    name: string;
}

function Tag() {
    const [isModal, setIsModal] = useState(false);
    const { control, handleSubmit } = useForm<FormTag>({ defaultValues: { name: '' } });

    const handleFormSubmit = (formValue: FormTag) => {
        console.log({ formValue });
    };

    return (
        <>
            <Sticky
                name='Thẻ'
                path='/tag'
                Icon={TagIcon}
                type='menu'
                onAdd={() => setIsModal(true)}
            />
            <ModalForm
                isCenter
                title='Tạo thẻ mới'
                description='Dùng thẻ để bổ sung từ khóa vào ghi chú, giúp bạn dễ dàng tìm kiếm và duyệt xem hơn.'
                isOpen={isModal}
                setIsOpen={setIsModal}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <InputField name='name' control={control} placeholder='Tên thẻ' />
            </ModalForm>
        </>
    );
}

export default Tag;
