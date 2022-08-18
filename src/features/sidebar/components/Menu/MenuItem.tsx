import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { useLocation, useSearchParams } from 'react-router-dom';

import { AddIconSmall, IconProps } from 'assets/icons';
import useNavigateParams from 'hooks/useNavigateParams';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { sidebarActions } from 'features/sidebar/sidebarSlice';
import MenuSub from './MenuSub';

import styles from './Menu.module.scss';
const cx = classnames.bind(styles);

type Navigate = {
    path?: string;
    params?: { [key: string]: any };
};

export type MenuSubProps = Array<{
    _id: string;
    name: string;
    icon: (props: IconProps) => any;
    type: { name: 'notebook' | 'note' | 'tag'; value: 'n' | 'b' | 't' };
    navigate?: Navigate;
}>;

export type Types = Array<'menu' | 'link' | 'slide'>;

interface MenuItemProps {
    icon: {
        main: (props: IconProps) => any;
        add?: (props: IconProps) => any;
    };

    topic: { title: string; value?: string };
    types: Types;
    menuSubs?: Array<{ data: MenuSubProps; heading?: string }>;
    onAdd?: () => void;
    navigate?: Navigate;
}

function MenuItem({ icon, topic, types, onAdd, menuSubs, navigate }: MenuItemProps) {
    const dispatch = useAppDispatch();
    const { isSmall } = useAppSelector((state) => state.sidebar);
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
        <div
            className={cx({ slide: types.includes('menu') })}
            onMouseOver={(e) => {
                if (!isSmall) return;

                const isOnSlide = Array.from(e.currentTarget.classList).includes(cx('slide'));

                dispatch(sidebarActions.setIsSlide(isOnSlide));
            }}
        >
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
                <div className={cx('menu')}>
                    {menuSubs?.map((menuSub, index) => {
                        const heading = menuSub.heading;
                        const data = menuSub.data;
                        return (
                            <Fragment key={index}>
                                {heading && <h3 className={styles.heading}>{heading}</h3>}
                                <MenuSub data={data} types={types} />
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
        </div>
    );
}

export default MenuItem;
