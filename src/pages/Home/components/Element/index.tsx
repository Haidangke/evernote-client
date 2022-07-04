import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';

import { AddNoteIcon, OtherIcon } from 'assets/icons';
import { TippyHeadless } from 'components/Tippy';
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
                <TippyHeadless
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
                        <OtherIcon />
                    </div>
                </TippyHeadless>
            </div>
            {children}
        </div>
    );
}

export default Element;
