import { ReactElement } from 'react';
import toast from 'react-hot-toast';

import { IoMdClose } from 'react-icons/io';
import styles from './Toast.module.scss';

interface ToastProps {
    content?: string;
    children?: ReactElement;
}

function Toast({ content, children }: ToastProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{content || children}</div>

            <div className={styles.icon} onClick={() => toast.remove()}>
                <IoMdClose />
            </div>
        </div>
    );
}

export default Toast;
