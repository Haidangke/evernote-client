import classNames from 'classnames/bind';

import Button, { Variant } from 'components/Button';
import { CloseIcon } from 'assets/icons';
import Modal, { ModalProps } from '..';

import styles from './ModalForm.module.scss';

interface ModalFormProps extends ModalProps {
    title: string;
    description?: string;
    onSubmit: () => void;
    variant?: Variant;
    content?: string;
    disabled?: boolean;
}

const cx = classNames.bind(styles);

function ModalForm({
    isOpen,
    setIsOpen,
    children,
    title,
    description,
    onSubmit,
    variant = 'primary',
    content = 'Tạo',
    isSmall,
    disabled,
}: ModalFormProps) {
    return (
        <Modal isSmall={isSmall} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>
                    <span>{title}</span>
                    <span onClick={() => setIsOpen(false)}>
                        <CloseIcon className={cx('icon')} />
                    </span>
                </h2>
                {description && <p className={cx('description')}>{description}</p>}
            </div>
            <div className={cx('form')}>
                {children}
                <div className={cx('button')}>
                    <Button onClick={() => setIsOpen(false)} variant='outline' content='Hủy' />
                    <Button
                        onClick={onSubmit}
                        variant={variant}
                        content={content}
                        disabled={disabled === undefined ? false : disabled}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ModalForm;
