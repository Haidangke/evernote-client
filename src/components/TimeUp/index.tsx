import { memo } from 'react';
import classNames from 'classnames/bind';

import useConvertISODate from 'hooks/useConvertIOSDate';

import styles from './TimeUp.module.scss';
const cx = classNames.bind(styles);

interface TimeUpProps {
    updatedAt: string;
    className?: string;
}

function TimeUp({ updatedAt, className }: TimeUpProps) {
    const time = useConvertISODate(updatedAt);

    return <div className={cx(className || 'wrapper')}>{time}</div>;
}

export default memo(TimeUp);
