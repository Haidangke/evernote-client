import { ReactElement, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './Slide.module.scss';
import './Slide.scss';

interface SlideProps {
    children: ReactElement;
}

function Slide({ children }: SlideProps) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => setIsOpen(false));

    return (
        <CSSTransition nodeRef={modalRef} in={isOpen} timeout={300} classNames='slide-list'>
            <div ref={modalRef} className={styles.wrapper}>
                {children}
            </div>
        </CSSTransition>
    );
}

export default Slide;
