import classNames from 'classnames/bind';

import Button, { Variant } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal, { ModalProps } from '..';

import styles from './ModalCreate.module.scss';

interface ModalCreateProps extends ModalProps {
    title: string;
    description?: string;
    onSubmit: () => void;
    variant?: Variant;
    action?: string;
    disabled?: boolean;
}

const cx = classNames.bind(styles);

function ModalCreate({
    isOpen,
    setIsOpen,
    children,
    title,
    description,
    onSubmit,
    variant = 'primary',
    action = 'Tạo',
    isSmall,
    disabled,
}: ModalCreateProps) {
    return (
        <Modal isSmall={isSmall} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>
                    <span>{title}</span>
                    <span onClick={() => setIsOpen && setIsOpen(false)}>
                        <CloseIcon className={cx('icon')} />
                    </span>
                </h2>
                {description && <p className={cx('description')}>{description}</p>}
            </div>
            <div className={cx('form')}>
                {children}
                <div className={cx('button')}>
                    <Button
                        onClick={() => setIsOpen && setIsOpen(false)}
                        variant='outline'
                        content='Hủy'
                    />
                    <Button
                        onClick={onSubmit}
                        variant={variant}
                        content={action}
                        disabled={disabled === undefined ? false : disabled}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ModalCreate;
