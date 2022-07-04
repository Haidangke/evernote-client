import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SlideTag from './Tag';

import styles from './SlideList.module.scss';
const cx = classNames.bind(styles);

function SlideList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    let Component = null;
    const tag = searchParams.get('tag');

    if (tag) Component = SlideTag;

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
        <>
            {isOpen && <div className={cx('overplay')} onClick={handleClose}></div>}
            <div className={cx('wrapper', { open: isOpen })}>{Component && <Component />}</div>
        </>
    );
}

export default SlideList;
