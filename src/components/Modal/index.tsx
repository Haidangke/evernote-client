import classNames from 'classnames/bind';
import { useRef } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import Popper from '../Popper';
import styles from './Modal.module.scss';

export interface ModalProps {
    children: any;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isCenter?: boolean;
}

const cx = classNames.bind(styles);

function Modal({ children, isOpen, setIsOpen, isCenter }: ModalProps) {
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => setIsOpen(false));
    if (!isOpen) return <></>;
    return (
        <div className={styles.overplay}>
            <div ref={modalRef} className={cx('wrapper', { isCenter })}>
                <Popper>{children}</Popper>
            </div>
        </div>
    );
}

export default Modal;
