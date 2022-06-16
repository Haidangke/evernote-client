import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import styles from './SlateFooter.module.scss';

const cx = classNames.bind(styles);

function SlateFooter() {
    const { isUpdating, isUpdateSuccess, isUpdateFailed, isLoading } = useAppSelector(
        (state) => state.note
    );
    const [status, setStatus] = useState('Đã lưu mọi thay đổi');

    useEffect(() => {
        if (isLoading) {
            setStatus('Đang lưu...');
        }
        if (!isLoading && isUpdateSuccess) {
            setStatus('Đã lưu mọi thay đổi');
        }

        if (!isLoading && isUpdateFailed) {
            setStatus('Lưu không thành công');
        }
    }, [isUpdating, isUpdateSuccess, isUpdateFailed, isLoading]);

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

export default SlateFooter;
