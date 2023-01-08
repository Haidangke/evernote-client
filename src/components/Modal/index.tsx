import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';

import useOnClickOutside from 'hooks/useOnclickOutside';
import Popper from '../Popper';
import styles from './Modal.module.scss';
import './Modal.scss';

export interface ModalProps {
    children?: any;
    isOpen: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    isSmall?: boolean;
    width?: string;
}
const cx = classNames.bind(styles);
function Modal({ children, isOpen, setIsOpen, isSmall, width }: ModalProps) {
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
                    <div
                        style={{ width: width || 'unset' }}
                        className={cx('content', {
                            isSmall,
                        })}
                    >
                        <Popper>{children}</Popper>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}

export default Modal;
