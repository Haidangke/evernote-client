import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './Menu.module.scss';
import { AddIconSmall, IconProps, TriangleIcon } from '~/assets/icons';

const cx = classnames.bind(styles);

type Type = 'menu' | 'link' | 'sidebar';

interface MenuItemProps {
    icon: (props: IconProps) => any;
    addIcon?: (props: IconProps) => any;
    name: string;
    value: string;
    path?: string;
    types: Type[];
    items?: Array<{
        name: string;
        icon: (props: IconProps) => any;
        path?: string;
    }>;
    onAdd?: () => void;
}

function MenuItem({ icon, addIcon, name, path, types, items, onAdd, value }: MenuItemProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMenu, setIsMenu] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const Icon = icon;
    const AddIcon = addIcon;

    const param = searchParams.get(value);
    const handleClickContent = () => {
        if (types.includes('sidebar')) {
            searchParams.set(value, param ? (param === 'true' ? 'false' : 'true') : 'true');
            setSearchParams(searchParams);
        }
        if (types.includes('link') && path && !(pathname === path)) navigate(path);
    };

    useEffect(() => {
        if (param && !['true', 'false'].includes(param)) {
            searchParams.set(value, 'false');
            setSearchParams(searchParams);
        }
    }, [param, searchParams, setSearchParams, value]);

    return (
        <Fragment>
            <div
                onClick={() => !onAdd && setIsMenu(!isMenu)}
                className={cx('menu-item', { active: pathname === path })}
            >
                {types.includes('menu') && (
                    <div
                        className={cx('triangle', { triangle__active: isMenu })}
                        onClick={() => setIsMenu(!isMenu)}
                    >
                        <TriangleIcon width={16} height={16} />
                    </div>
                )}

                <div onClick={() => handleClickContent()} className={cx('content')}>
                    <div className={cx('icon')}>
                        <Icon />
                    </div>

                    <div className={cx('name')}>{name}</div>
                </div>

                {onAdd && (
                    <Tippy placement='right' content={`${name} mới`}>
                        <div onClick={onAdd} className={cx('add-btn')}>
                            <AddIconSmall />
                        </div>
                    </Tippy>
                )}
            </div>

            {isMenu && types.includes('menu') && (
                <div className={cx('menu-sub')}>
                    {items?.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                            <div key={index} className={cx('item')}>
                                <ItemIcon width={20} height={20} className={cx('item-icon')} />
                                <div className={cx('item-name')}>{item.name}</div>
                            </div>
                        );
                    })}

                    {onAdd && AddIcon && (
                        <div onClick={onAdd} className={cx('item', 'item__add')}>
                            <AddIcon width={20} height={20} className={cx('item-icon')} />
                            <div className={cx('item-name')}>{`${name} mới`}</div>
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
}

export default MenuItem;
