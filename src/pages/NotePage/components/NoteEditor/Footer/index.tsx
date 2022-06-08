import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAppSelector } from '~/app/hooks';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const { isUpdating, isUpdateSuccess, isUpdateFailed } = useAppSelector((state) => state.note);
    const [status, setStatus] = useState('Đã lưu mọi thay đổi');

    useEffect(() => {
        if (isUpdating) {
            setStatus('Đang lưu...');
        }
        if (isUpdateSuccess) {
            setStatus('Đã lưu mọi thay đổi');
        }

        if (isUpdateFailed) {
            setStatus('Lưu không thành công');
        }
    }, [isUpdating, isUpdateSuccess, isUpdateFailed]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}></div>
            <div className={cx('right')}>
                <div
                    className={cx('status', {
                        'status-failed': isUpdateFailed,
                    })}
                >
                    {status}
                </div>
            </div>
        </div>
    );
}

export default Footer;
