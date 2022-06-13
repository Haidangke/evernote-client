import classNames from 'classnames/bind';
import { useRef } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import Popper from '../Popper';
import styles from './Modal.module.scss';

interface ModalProps {
    children: any;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const cx = classNames.bind(styles);

function Modal({ children, isOpen, setIsOpen }: ModalProps) {
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => setIsOpen(false));
    if (!isOpen) return <></>;
    return (
        <div ref={modalRef} className={cx('wrapper')}>
            <Popper>{children}</Popper>
        </div>
    );
}

export default Modal;
