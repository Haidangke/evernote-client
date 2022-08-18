import { useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';

import styles from './SlideSmall.module.scss';
const cx = classNames.bind(styles);

interface SlideSmallProps {}

function SlideSmall({}: SlideSmallProps) {
    const { isSlide, topic } = useAppSelector((state) => state.sidebar);

    return <div className={cx('wrapper', { wrapper__active: isSlide })}>SlideSmalls</div>;
}

export default SlideSmall;
