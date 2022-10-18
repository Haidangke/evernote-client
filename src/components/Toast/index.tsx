import { ReactElement } from 'react';
import toast from 'react-hot-toast';

import { IoMdClose } from 'react-icons/io';
import styles from './Toast.module.scss';

interface ToastProps {
    content?: string;
    children?: ReactElement;
    toastId: string;
}

function Toast({ content, children, toastId }: ToastProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{content || children}</div>

            <div className={styles.icon} onClick={() => toast.dismiss(toastId)}>
                <IoMdClose />
            </div>
        </div>
    );
}

export default Toast;
