import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ArrowLeftIcon } from 'components/Icons';
import { sidebarActions } from 'features/sidebar/sidebarSlice';
import useWindowWidth from 'hooks/useWindowWidth';
import Actions from './components/Actions';
import Header from './components/Header';
import Menu from './components/Menu';
import SlideLarge from './components/SlideLarge';

import styles from './Sidebar.module.scss';
import Search from './components/Search';

const cx = classnames.bind(styles);

const widthLocal = parseFloat(JSON.parse(localStorage.getItem('width-sidebar') as string));
const width = typeof widthLocal === 'number' && !Number.isNaN(widthLocal) ? widthLocal : 320;

function Sidebar() {
    const [searchParams] = useSearchParams();

    const expand = JSON.parse(searchParams.get('fs') || 'false');

    const dispatch = useAppDispatch();
    const { isSmall } = useAppSelector((state) => state.sidebar);
    const [resizable, setResizable] = useState({ width, height: '100vh' });

    const [maxWidth, setMaxWidth] = useState(400);

    const widthWindow = useWindowWidth();
    useEffect(() => {
        if (widthWindow < 0) return;
        const limitWidth = widthWindow / 3;

        if (limitWidth < 400) {
            setMaxWidth(limitWidth);
        } else {
            setMaxWidth(400);
        }
    }, [widthWindow]);

    if (expand) return <></>;

    return (
        <Resizable
            className={cx('resizable', { 'resizable-small': isSmall })}
            style={{ backgroundColor: '#1a1a1a' }}
            enable={{ right: true }}
            maxWidth={maxWidth}
            minWidth={270}
            size={{
                width: resizable.width,
                height: resizable.height,
            }}
            onResizeStop={(e, direction, ref, d) => {
                setResizable({
                    width: resizable.width + d.width,
                    height: resizable.height + d.height,
                });
                localStorage.setItem('width-sidebar', JSON.stringify(resizable.width + d.width));
            }}
        >
            <div
                onClick={() => {
                    dispatch(sidebarActions.setIsSmall(!isSmall));
                }}
                className={cx('resize-btn')}
            >
                <ArrowLeftIcon width={14} height={14} />
            </div>
            <div
                className={cx('wrapper')}
                onMouseLeave={() => {
                    dispatch(sidebarActions.setIsSlide(false));
                }}
            >
                <div className={cx('main')}>
                    <Header />
                    <div className={cx('action')}>
                        <Search />
                        <Actions />
                    </div>
                    <Menu />
                </div>
                <SlideLarge />
            </div>
        </Resizable>
    );
}

export default Sidebar;
