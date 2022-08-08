import { Dispatch, SetStateAction, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { SortIcon, TwoWayArrowIcon } from 'assets/icons';
import { actionsConfig, Sort } from 'config/actions';
import TippyHeadless from '../Headless';
import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './Sort.module.scss';
const cx = classNames.bind(styles);

interface SortProps {
    setSort: Dispatch<SetStateAction<Sort>>;
    sort: Sort;
}

function TippySort({ sort, setSort }: SortProps) {
    const iconRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef(null);
    const [isSort, setIsSort] = useState(false);

    useOnClickOutside(dropdownRef, (event: any) => {
        if (!iconRef.current || iconRef.current.contains(event.target)) return;
        setIsSort(false);
    });

    return (
        <TippyHeadless
            outside={false}
            visible={isSort}
            setVisible={setIsSort}
            dropdown={
                isSort ? (
                    <div className={styles.wrapper} ref={dropdownRef}>
                        <div className={styles.title}>Sắp xếp theo</div>
                        {actionsConfig.sort.map((item) => {
                            const active = item.value === sort;
                            return (
                                <div
                                    key={item.value}
                                    onClick={() => {
                                        setSort(item.value);
                                        setIsSort(false);
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
                    </div>
                ) : (
                    <></>
                )
            }
        >
            <div ref={iconRef} className={cx('sort')} onClick={() => setIsSort(!isSort)}>
                <SortIcon className={cx('sort-icon')} />
            </div>
        </TippyHeadless>
    );
}

export default TippySort;
