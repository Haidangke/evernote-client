import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

interface PopperProps {
    children?: any;
    className?: string;
}

const cx = classNames.bind(styles);

function Popper({ children, className }: PopperProps) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Popper;
