import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useAppSelector } from 'app/hooks';

import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

function FooterStatus() {
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
        <div
            className={cx('status', {
                'status-failed': isUpdateFailed,
            })}
        >
            {status}
        </div>
    );
}
export default FooterStatus;
