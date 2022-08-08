import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { Resizable } from 're-resizable';

import { ArrowLeftIcon } from 'assets/icons';
import useWindowWidth from 'hooks/useWindowWidth';
import Actions from './Actions';
import Menu from './Menu';
import Header from './Header';

import './Sidebar.scss';
import SlideList from '../SlideList';
import styles from './Sidebar.module.scss';

const cx = classnames.bind(styles);

const widthLocal = parseFloat(JSON.parse(localStorage.getItem('width-sidebar') as string));
const width = typeof widthLocal === 'number' && !Number.isNaN(widthLocal) ? widthLocal : 320;

const isSmallLocal = JSON.parse(localStorage.getItem('isSmall-sidebar') as string);
const isSmall = typeof isSmallLocal === 'boolean' ? isSmallLocal : false;

function Sidebar() {
    const [resizable, setResizable] = useState({ width, height: '100vh' });
    const [isSmallSidebar, setIsSmallSidebar] = useState(isSmall);
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

    return (
        <Resizable
            className={cx('resizable', { 'resizable-small': isSmallSidebar })}
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
                    const value = !isSmallSidebar;
                    setIsSmallSidebar(value);
                    localStorage.setItem('isSmall-sidebar', JSON.stringify(value));
                }}
                className={cx('resize-btn')}
            >
                <ArrowLeftIcon width={14} height={14} />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('main')}>
                    <Header isSmallSidebar={isSmallSidebar} />
                    <Actions isSmallSidebar={isSmallSidebar} />
                    <Menu isSmallSidebar={isSmallSidebar} />
                </div>
                <SlideList />
            </div>
        </Resizable>
    );
}

export default Sidebar;
