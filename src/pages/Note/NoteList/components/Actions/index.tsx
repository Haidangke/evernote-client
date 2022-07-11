import { Dispatch, memo, SetStateAction } from 'react';
import classNames from 'classnames/bind';

import { FilterIcon, ViewIcon } from 'assets/icons';
import { TippyButton, TippySort } from 'components/Tippy';
import { Sort } from 'config/actions';

import styles from './Actions.module.scss';
const cx = classNames.bind(styles);

interface ActionsProps {
    sort: Sort;
    setSort: Dispatch<SetStateAction<Sort>>;
}

function Actions({ sort, setSort }: ActionsProps) {
    return (
        <div className={cx('actions')}>
            <TippySort sort={sort} setSort={setSort} />

            <TippyButton content='Thêm bộ lọc' placement='top'>
                <FilterIcon className={cx('actions-icon')} />
            </TippyButton>
            <TippyButton content='Chế độ xem' placement='top'>
                <ViewIcon className={cx('actions-icon')} />
            </TippyButton>
        </div>
    );
}
export default memo(Actions);
