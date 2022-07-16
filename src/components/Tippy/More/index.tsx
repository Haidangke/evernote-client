import { ReactElement, useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import TippyHeadLess from '../Headless';
import styles from './More.module.scss';

interface MoreProps {
    dropdown: ReactElement;
}

function More({ dropdown }: MoreProps) {
    const [isMore, setIsMore] = useState(false);
    return (
        <TippyHeadLess
            dropdown={dropdown}
            visible={isMore}
            setVisible={setIsMore}
            placement='bottom-end'
        >
            <div onClick={() => setIsMore(!isMore)} className={styles.more}>
                <IoIosMore />
            </div>
        </TippyHeadLess>
    );
}

export default More;
