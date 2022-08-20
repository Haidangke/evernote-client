import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';
import { constants } from 'config';
import { Fragment, useCallback, useRef, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { useLocation, useSearchParams } from 'react-router-dom';

import { AddIconSmall, IconProps } from 'assets/icons';
import useNavigateParams from 'hooks/useNavigateParams';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { sidebarActions } from 'features/sidebar/sidebarSlice';
import { TopicValue } from 'types';
import SlideSmall from '../SlideSmall';
import MenuSub from './MenuSub';

import styles from './Menu.module.scss';
const cx = classnames.bind(styles);

export type Navigate = {
    path?: string;
    params?: { [key: string]: any };
};

export interface ItemSubProps {
    _id: string;
    name: string;
    icon: (props: IconProps) => any;
    type: { name: 'notebook' | 'note' | 'tag'; value: 'n' | 'b' | 't' };
    navigate?: Navigate;
    topicValue?: string;
}

export type MenuSubProps = Array<ItemSubProps>;

export type MenuSubsProps = Array<{ data: MenuSubProps; heading?: string; _id: string }>;

export type Types = Array<'menu' | 'link' | 'slide'>;

export interface MenuItemProps {
    icon: {
        main: (props: IconProps) => any;
        add?: (props: IconProps) => any;
    };

    topic: { title: string; value?: TopicValue };
    types: Types;
    menuSubs?: MenuSubsProps;
    onAdd?: () => void;
    navigate?: Navigate;
}

function MenuItem({ icon, topic, types, onAdd, menuSubs, navigate }: MenuItemProps) {
    const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
    const dispatch = useAppDispatch();
    const { isSmall } = useAppSelector((state) => state.sidebar);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMenu, setIsMenu] = useState(false);
    const { pathname } = useLocation();

    const navigateParams = useNavigateParams();

    const Icon = icon.main;
    const AddIcon = icon.add;

    const path = navigate?.path;
    const params = navigate?.params;

    const { title, value } = topic;

    const handleClickContent = useCallback(() => {
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
            if (!path || pathname === path) return;

            navigateParams(path, params);
        }
    }, [params, navigateParams, path, pathname, searchParams, setSearchParams, types, value]);

    const startAnimation = (idEl: string, classEl: string) => {
        const id = setTimeout(() => {
            const isSlide = idEl === constants.ID_SLIDE;

            dispatch(sidebarActions.setTopic(classEl));
            dispatch(sidebarActions.setIsSlide(isSlide));
        }, 200);
        intervalRef.current = id;
    };

    return (
        <div
            id={types.includes('menu') ? constants.ID_SLIDE : ''}
            className={cx({ [`${value}`]: types.includes('menu') })}
            onMouseEnter={(e) => {
                if (!isSmall) return;
                const id = e.currentTarget.id;
                const className = e.currentTarget.className;
                startAnimation(id, className);
            }}
            onMouseLeave={() => clearInterval(intervalRef.current as NodeJS.Timeout)}
        >
            {types.includes('menu') && (
                <SlideSmall
                    onAdd={onAdd}
                    AddIcon={AddIcon}
                    menuSubs={menuSubs}
                    title={title}
                    topicValue={value}
                />
            )}
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
                    {menuSubs?.map((menuSub) => {
                        const heading = menuSub.heading;
                        const data = menuSub.data;
                        return (
                            <Fragment key={menuSub._id}>
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
