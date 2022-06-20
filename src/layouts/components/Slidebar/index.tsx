import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SlideTag from './SlideTag';

import styles from './Slidebar.module.scss';
const cx = classNames.bind(styles);

function Slidebar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    let Component = null;
    const tag = searchParams.get('tag');

    if (tag) Component = SlideTag;

    useEffect(() => {
        setIsOpen(tag === 'true' ? true : false);
    }, [tag]);

    return (
        <>
            {isOpen && <div className={cx('overplay')}></div>}
            <div className={cx('wrapper', { open: isOpen })}>{Component && <Component />}</div>
        </>
    );
}

export default Slidebar;
