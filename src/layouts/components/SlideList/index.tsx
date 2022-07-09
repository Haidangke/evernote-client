import { Fragment, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import SlideTag from './SlideTag';
import styles from './SlideList.module.scss';
import './SlideList.scss';

function SlideList() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const modalRef = useRef(null);
    const overplayRef = useRef(null);

    let Component = null;
    const tag = searchParams.get('tag');

    if (tag) {
        Component = SlideTag;
    }

    useEffect(() => {
        if (tag === 'true') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [tag]);

    const handleClose = () => {
        if (tag === 'true') {
            searchParams.delete('tag');
        }
        setSearchParams(searchParams);
    };

    return (
        <Fragment>
            <CSSTransition
                nodeRef={overplayRef}
                in={isOpen}
                timeout={300}
                classNames='overplay'
                unmountOnExit
            >
                <div ref={overplayRef} className={styles.overplay} onClick={handleClose}></div>
            </CSSTransition>
            <CSSTransition nodeRef={modalRef} in={isOpen} timeout={300} classNames='slide-list'>
                <div ref={modalRef} className={styles.wrapper}>
                    {Component && <Component />}
                </div>
            </CSSTransition>
        </Fragment>
    );
}

export default SlideList;
