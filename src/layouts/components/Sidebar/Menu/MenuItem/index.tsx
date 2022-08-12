import { Fragment, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import useNavigateParams from 'hooks/useNavigateParams';
import { AddIconSmall, IconProps } from 'assets/icons';
import Item from './Item';

import styles from '../Menu.module.scss';
const cx = classnames.bind(styles);

type Navigate = {
    path?: string;
    params?: { [key: string]: any };
};

export type ItemProps = Array<{
    _id: string;
    name: string;
    icon: (props: IconProps) => any;
    navigate?: Navigate;
    type: { name: 'notebook' | 'note' | 'tag'; value: 'b' | 'n' | 't' };
}>;

export type Types = Array<'menu' | 'link' | 'slide'>;

interface MenuItemProps {
    icon: {
        main: (props: IconProps) => any;
        add?: (props: IconProps) => any;
    };

    topic: { title: string; value?: string };
    types: Types;
    items?: ItemProps;
    itemSub?: {
        heading?: string;
        data: ItemProps;
    };
    onAdd?: () => void;
    navigate?: Navigate;
}

function MenuItem({ icon, topic, types, items, onAdd, itemSub, navigate }: MenuItemProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMenu, setIsMenu] = useState(false);
    const { pathname } = useLocation();
    const navigateParams = useNavigateParams();

    const Icon = icon.main;
    const AddIcon = icon.add;

    const path = navigate?.path;
    const { title, value } = topic;

    const handleClickContent = () => {
        if (types.includes('slide') && value) {
            const param = value && searchParams.get(value);
            if (param === 'true') {
                searchParams.delete(value);
            } else {
                searchParams.set(value, 'true');
            }
            setSearchParams(searchParams);
        }
        if (types.includes('link')) {
            const params = navigate?.params;

            if (!path || pathname === path) return;

            navigateParams(path, params);
        }
    };

    return (
        <Fragment>
            <div
                onClick={() => !onAdd && setIsMenu(!isMenu)}
                className={cx('item', { item__active: pathname === path })}
            >
                {/* hình tam giác dùng để đóng mở menu */}
                {types.includes('menu') && (
                    <div
                        className={cx('triangle', { triangle__active: isMenu })}
                        onClick={() => setIsMenu(!isMenu)}
                    >
                        <IoMdArrowDropright width={16} height={16} />
                    </div>
                )}

                {/* nhấn vào nội dung bên trong của menu */}
                <div onClick={() => handleClickContent()} className={cx('content')}>
                    <div className={cx('icon')}>
                        <Icon />
                    </div>

                    <div className={cx('name')}>{title}</div>
                </div>

                {/* tạo mới một cái gì đó */}
                {onAdd && (
                    <Tippy placement='right' content={`${title} mới`}>
                        <div onClick={onAdd} className={cx('add-btn')}>
                            <AddIconSmall />
                        </div>
                    </Tippy>
                )}
            </div>

            {/* dành cho những item sử dụng menu có menu con*/}

            {isMenu && types.includes('menu') && (
                <div>
                    <Item data={items} types={types} page={value} />
                    {itemSub && (
                        <>
                            <h3 className={styles.heading}>{itemSub.heading}</h3>
                            <Item data={itemSub.data} types={types} page={value} />
                        </>
                    )}

                    {/* tạo mới trong phần menu con */}
                    {onAdd && AddIcon && (
                        <div onClick={onAdd} className={cx('sub', 'sub-add')}>
                            <AddIcon width={20} height={20} className={cx('sub-icon')} />
                            <div className={cx('sub-name')}>{`${title} mới`}</div>
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
}

export default MenuItem;
