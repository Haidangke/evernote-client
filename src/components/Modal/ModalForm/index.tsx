import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { CloseIcon } from '~/components/Icon';
import Modal, { ModalProps } from '..';

import styles from './ModalForm.module.scss';
interface ModalFormProps extends ModalProps {
    title: string;
    description: string;
    onSubmit: () => void;
}

const cx = classNames.bind(styles);

function ModalForm({
    isOpen,
    setIsOpen,
    children,
    title,
    description,
    onSubmit,
    isCenter,
}: ModalFormProps) {
    return (
        <Modal isCenter={isCenter} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>
                    <span>{title}</span>
                    <CloseIcon className={cx('icon')} />
                </h2>
                <p className={cx('description')}>{description}</p>
            </div>
            <form className={cx('form')} onSubmit={onSubmit}>
                {children}
                <div className={cx('button')}>
                    <Button onClick={() => setIsOpen(false)} variant='outline' content='Hủy' />
                    <Button type='submit' variant='primary' content='Tạo' />
                </div>
            </form>
        </Modal>
    );
}

export default ModalForm;
