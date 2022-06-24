import { ReactNode } from 'react';
import { AddNoteIcon, OtherIcon } from 'assets/icons';
import styles from './Element.module.scss';
import classNames from 'classnames/bind';

interface ElementProps {
    children: ReactNode;
    className?: string;
    title: ReactNode;
}

const cx = classNames.bind(styles);

function Element({ children, className, title }: ElementProps) {
    return (
        <div className={cx('wrapper', { className })}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.btn}>
                    <span>
                        <AddNoteIcon />
                    </span>
                    <span>
                        <OtherIcon />
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
}

export default Element;
