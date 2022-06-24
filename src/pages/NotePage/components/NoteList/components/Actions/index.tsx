import classNames from 'classnames/bind';
import { FilterIcon, SortIcon, TwoWayArrowIcon, ViewIcon } from 'assets/icons';
import { TippyButton, TippyHeadless } from 'components/Tippy';

import styles from './Actions.module.scss';
import { useState } from 'react';
import { ActionsType, actionsConfig } from 'config/actions';
const cx = classNames.bind(styles);

interface ActionsProps {
    setActions: (actions: ActionsType) => void;
    actions: ActionsType;
}

function Actions({ setActions, actions }: ActionsProps) {
    const [isSort, setIsSort] = useState(false);
    return (
        <div className={cx('actions')}>
            <TippyHeadless
                visible={isSort}
                setVisible={setIsSort}
                dropdown={
                    <div className={cx('drdown')}>
                        <div className={cx('drdown-title')}>Sắp xếp theo</div>
                        {actionsConfig.sort.map((item) => {
                            const active = item.value === actions.sort;
                            return (
                                <div
                                    key={item.value}
                                    onClick={() => setActions({ ...actions, sort: item.value })}
                                    className={cx('drdown-item', {
                                        'drdown-item__active': active,
                                    })}
                                >
                                    {active && (
                                        <div className={cx('drdown-icon')}>
                                            <TwoWayArrowIcon />
                                        </div>
                                    )}
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                }
            >
                <div className={cx('action')} onClick={() => setIsSort(!isSort)}>
                    <SortIcon className={cx('actions-icon')} />
                </div>
            </TippyHeadless>

            <TippyButton content='Thêm bộ lọc' placement='top'>
                <FilterIcon className={cx('actions-icon')} />
            </TippyButton>
            <TippyButton content='Chế độ xem' placement='top'>
                <ViewIcon className={cx('actions-icon')} />
            </TippyButton>
        </div>
    );
}
export default Actions;
