import { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames/bind';

import { SortIcon, TwoWayArrowIcon } from 'components/Icons';
import { sortConfig, SortConfig } from 'config/actions';
import { TippyHeadLessOneWay } from '../TippyHeadLess';

import styles from './TippySort.module.scss';
const cx = classNames.bind(styles);

interface SortProps {
    setSort: Dispatch<SetStateAction<SortConfig>>;
    sort: SortConfig;
}

function TippySort({ sort, setSort }: SortProps) {
    const [visible, setVisible] = useState(false);

    return (
        <TippyHeadLessOneWay
            visible={visible}
            setVisible={setVisible}
            placement='bottom-start'
            dropdown={
                <>
                    <div className={styles.title}>Sắp xếp theo</div>
                    {sortConfig.map((item) => {
                        const active = item.value === sort;
                        return (
                            <div
                                key={item.value}
                                onClick={() => {
                                    setSort(item.value);
                                    setVisible(false);
                                }}
                                className={cx('item', {
                                    item__active: active,
                                })}
                            >
                                {active && (
                                    <div className={styles.icon}>
                                        <TwoWayArrowIcon />
                                    </div>
                                )}
                                {item.name}
                            </div>
                        );
                    })}
                </>
            }
        >
            <SortIcon className={cx('sort-icon')} />
        </TippyHeadLessOneWay>
    );
}

export default TippySort;
