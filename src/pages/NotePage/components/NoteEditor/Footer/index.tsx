import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}></div>
            <div className={cx('right')}>
                <div className='status'>Đã lưu mọi thay đổi</div>
            </div>
        </div>
    );
}

export default Footer;
