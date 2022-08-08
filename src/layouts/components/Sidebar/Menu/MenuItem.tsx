import { Fragment, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import useNavigateParams from 'hooks/useNavigateParams';
import { AddIconSmall, IconProps } from 'assets/icons';

import styles from './Menu.module.scss';
const cx = classnames.bind(styles);

interface MenuItemProps {
    active?: number;
    icon: {
        main: (props: IconProps) => any;
        add?: (props: IconProps) => any;
    };

    topic: { title: string; value: string };
    types: Array<'menu' | 'link' | 'slide'>;
    items?: Array<{
        _id: string;
        name: string;
        icon: (props: IconProps) => any;
        path?: string;
        type: 'note' | 'notebook' | 'tag';
    }>;
    onAdd?: () => void;
    heading?: string;
}

function MenuItem({ icon, topic, types, items, onAdd, active = -1, heading }: MenuItemProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMenu, setIsMenu] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const navigateParams = useNavigateParams();

    const Icon = icon.main;
    const AddIcon = icon.add;

    const { title, value } = topic;
    const param = searchParams.get(value);

    const path = types.includes('link') ? `/${topic.value}` : '';

    const handleClickContent = () => {
        if (types.includes('slide')) {
            if (param === 'true') {
                searchParams.delete(value);
            } else {
                searchParams.set(value, 'true');
            }
            setSearchParams(searchParams);
        }
        if (path && !(pathname === path)) navigate(path);
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
                    {items?.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                            <Fragment key={item.name}>
                                {heading && <h3 className={styles.heading}>{heading}</h3>}
                                <div
                                    className={cx('sub', { sub__active: active === index })}
                                    onClick={() =>
                                        !types.includes('slide') &&
                                        navigateParams({ b: item._id }, `/${item.type}`)
                                    }
                                >
                                    <ItemIcon width={20} height={20} className={cx('sub-icon')} />
                                    <div className={cx('sub-name')}>{item.name}</div>
                                </div>
                            </Fragment>
                        );
                    })}

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
