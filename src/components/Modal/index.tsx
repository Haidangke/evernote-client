import { useRef } from 'react';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';

import useOnClickOutside from 'hooks/useOnclickOutside';
import Popper from '../Popper';
import styles from './Modal.module.scss';
import './Modal.scss';

export interface ModalProps {
    children: any;
    isOpen: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    // isCenter?: boolean;
}

const cx = classNames.bind(styles);

function Modal({ children, isOpen, setIsOpen }: ModalProps) {
    const modalRef = useRef(null);
    const wrapperRef = useRef(null);

    const overplayRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        if (setIsOpen !== undefined) setIsOpen(false);
    });
    return (
        <>
            <CSSTransition
                nodeRef={overplayRef}
                in={isOpen}
                timeout={300}
                classNames='overplay'
                unmountOnExit
            >
                <div ref={overplayRef} className={styles.overplay}></div>
            </CSSTransition>
            <CSSTransition
                nodeRef={wrapperRef}
                in={isOpen}
                timeout={300}
                classNames='modal'
                unmountOnExit
            >
                <div ref={wrapperRef} className={styles.wrapper}>
                    <div className={styles.content}>
                        <Popper>{children}</Popper>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}

export default Modal;
