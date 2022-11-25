import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import toast from 'react-hot-toast';

import { IoMdClose } from 'react-icons/io';
import styles from './Toast.module.scss';
const cx = classNames.bind(styles);

interface ToastProps {
    content?: string;
    children?: ReactElement;
    toastId: string;
    type?: 'primary' | 'error';
}

function Toast({ content, children, toastId, type = 'primary' }: ToastProps) {
    return (
        <div
            className={cx('wrapper', {
                primary: type === 'primary',
                error: type === 'error',
            })}
        >
            <div className={styles.content}>{content || children}</div>

            <div className={styles.icon} onClick={() => toast.dismiss(toastId)}>
                <IoMdClose />
            </div>
        </div>
    );
}

export default Toast;
