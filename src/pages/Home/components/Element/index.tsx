import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';

import { IoIosMore } from 'react-icons/io';
import { AddNoteIcon } from 'components/Icons';
import { TippyHeadLess } from 'components/Tippy';
import styles from './Element.module.scss';

interface ElementProps {
    children: ReactNode;
    className?: string;
    title: ReactNode;

    menu: Array<{
        title: string;
        handle: (params: any) => void;
    }>;
}

const cx = classNames.bind(styles);

function Element({ children, className, title, menu }: ElementProps) {
    const [isOther, setIsOther] = useState(false);

    return (
        <div className={cx('wrapper', { [`${className}`]: className })}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {/* <span>
                        <AddNoteIcon />
                    </span> */}
                <TippyHeadLess
                    visible={isOther}
                    setVisible={setIsOther}
                    dropdown={
                        <div className={styles.menu}>
                            {menu.map((item, index) => (
                                <div key={index} onClick={item.handle} className={styles.item}>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    }
                >
                    <div className={styles.btn} onClick={() => setIsOther(!isOther)}>
                        <IoIosMore />
                    </div>
                </TippyHeadLess>
            </div>
            {children}
        </div>
    );
}

export default Element;
