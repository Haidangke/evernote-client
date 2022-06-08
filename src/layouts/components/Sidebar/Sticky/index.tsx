import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from '~/layouts/components/Sidebar/Sidebar.module.scss';
import { AddIconSmall, IconProps, TriangleIcon } from '~/components/Icon';

const cx = classnames.bind(styles);

interface StickyProps {
    Icon: (props: IconProps) => any;
    name: string;
    path?: string;
    type: 'menu' | 'link' | 'link-menu';
    items?: Array<{
        name: string;
        Icon: (props: IconProps) => any;
        path?: string;
    }>;
    onAdd?: () => void;
}

function Sticky({ Icon, name, path = '', type, items, onAdd }: StickyProps) {
    const [isMenu, setIsMenu] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleRedirect = () => {
        if (['link', 'link-menu'].includes(type)) {
            navigate(path);
        }
    };

    return (
        <Fragment>
            <div>
                <div
                    onClick={() => type === 'menu' && setIsMenu(!isMenu)}
                    className={cx('sticky', { 'sticky-active': pathname === path })}
                >
                    {type !== 'link' && (
                        <div
                            className={cx('triangle', { 'triangle-active': isMenu })}
                            onClick={() => type === 'link-menu' && setIsMenu(!isMenu)}
                        >
                            <TriangleIcon width={16} height={16} />
                        </div>
                    )}

                    <div onClick={() => handleRedirect()} className={cx('sticky-link')}>
                        <div className={cx('sticky-icon')}>
                            <Icon />
                        </div>

                        <div className={cx('sticky-name')}>{name}</div>
                    </div>

                    {onAdd && (
                        <Tippy placement='right' content={`${name} mới`}>
                            <div onClick={onAdd} className={cx('sticky-add__btn')}>
                                <AddIconSmall />
                            </div>
                        </Tippy>
                    )}
                </div>
            </div>
            {isMenu && type !== 'link' && (
                <div className={cx('sticky-menu')}>
                    {items?.map((item, index) => {
                        const ItemIcon = item.Icon;
                        return (
                            <div key={index} className={cx('sticky-item')}>
                                <ItemIcon
                                    width={20}
                                    height={20}
                                    className={cx('sticky-item__icon')}
                                />
                                <div className={cx('sticky-item__name')}>{item.name}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Fragment>
    );
}

export default Sticky;
