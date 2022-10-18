import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddIconSmall } from 'assets/icons';
import { ID_SLIDE } from 'config/constants';
import { sidebarActions } from 'features/sidebar/sidebarSlice';
import useNavigateParams from 'hooks/useNavigateParams';
import { TopicValue } from 'types';
import { ItemSubProps, MenuSubsProps } from '../Menu/MenuItem';

import styles from './SlideSmall.module.scss';
const cx = classNames.bind(styles);

interface SlideSmallProps {
    onAdd?: () => void;
    menuSubs?: MenuSubsProps;
    title: string;
    topicValue?: TopicValue;
    AddIcon?: any;
}

function SlideSmall({ onAdd, menuSubs, title, topicValue, AddIcon }: SlideSmallProps) {
    const { isSlide, topic } = useAppSelector((state) => state.sidebar);
    const navigateParams = useNavigateParams();
    const dispatch = useAppDispatch();

    const handleClickContent = (itemSub: ItemSubProps) => {
        if (!(topicValue === 'tag')) {
            const path = itemSub.navigate?.path;
            const params = itemSub.navigate?.params;

            navigateParams(path || `/${itemSub.type.name}`, {
                [itemSub.type.value]: itemSub._id,
                ...params,
            });
        }

        dispatch(sidebarActions.setIsSlide(false));
    };

    return (
        <div
            id={ID_SLIDE}
            className={cx('wrapper', {
                wrapper__active: isSlide,
                wrapper__current: topic === topicValue,
            })}
        >
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {onAdd && (
                    <div className={styles.add} onClick={onAdd}>
                        <AddIconSmall />
                    </div>
                )}
            </div>

            {menuSubs?.map((menuSub) => (
                <Fragment key={menuSub._id}>
                    {menuSub.heading && <div className={styles.heading}>{menuSub.heading}</div>}
                    {menuSub.data.map((itemSub) => {
                        const Icon = itemSub.icon;

                        const isShortcut = itemSub.topicValue === 'shortcut';
                        return (
                            <div
                                className={styles.item}
                                key={itemSub._id}
                                onClick={() => handleClickContent(itemSub)}
                            >
                                <Icon className={styles.icon} />
                                <div className={styles.name}>{itemSub.name}</div>
                                {isShortcut && (
                                    <div className={styles.delete}>
                                        <TiDeleteOutline />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </Fragment>
            ))}
            {AddIcon && (
                <div onClick={onAdd} className={cx('item', 'item__add')}>
                    <AddIcon />
                    <div className={styles.name}>{title} mới</div>
                </div>
            )}
        </div>
    );
}

export default SlideSmall;
