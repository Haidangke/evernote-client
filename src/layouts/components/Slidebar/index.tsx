import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SlidebarTag from '../Sidebar/Tag/Slidebar';

import styles from './Slidebar.module.scss';
const cx = classNames.bind(styles);

function Slidebar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    let Component = null;
    const tag = searchParams.get('tag');

    if (tag) Component = SlidebarTag;

    useEffect(() => {
        setIsOpen(Boolean(tag));
    }, [tag]);

    return <div className={cx('wrapper', { open: isOpen })}>{Component && <Component />}</div>;
}

export default Slidebar;
