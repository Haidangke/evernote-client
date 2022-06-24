import { memo } from 'react';
import classNames from 'classnames/bind';

import useConvertISODate from 'hooks/useConvertIOSDate';

import styles from './List.module.scss';
const cx = classNames.bind(styles);

function TimeUp({ updatedAt }: { updatedAt: string }) {
    const time = useConvertISODate(updatedAt);

    return <div className={cx('column')}>{time}</div>;
}

export default memo(TimeUp);
