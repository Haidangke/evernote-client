import classNames from 'classnames/bind';

import Button, { Variant } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal, { ModalProps } from '..';

import styles from './ModalCreate.module.scss';

interface ModalCreateProps extends ModalProps {
    onSubmit: () => void;
    title?: string;
    description?: string;
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
    width,
}: ModalCreateProps) {
    return (
        <Modal isSmall={isSmall} isOpen={isOpen} setIsOpen={setIsOpen} width={width}>
            <div className={cx('header')}>
                {title && (
                    <h2 className={cx('title')}>
                        <span>{title}</span>
                        <span onClick={() => setIsOpen && setIsOpen(false)}>
                            <CloseIcon className={cx('icon')} />
                        </span>
                    </h2>
                )}
                {description && <p className={cx('description')}>{description}</p>}
            </div>
            {children}
            <div className={cx('form')}>
                <div className={cx('button')}>
                    <Button
                        onClick={() => setIsOpen && setIsOpen(false)}
                        variant='outline'
                        content='Hủy'
                    />
                    <Button
                        onClick={() => {
                            setIsOpen && setIsOpen(false);
                            onSubmit();
                        }}
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
