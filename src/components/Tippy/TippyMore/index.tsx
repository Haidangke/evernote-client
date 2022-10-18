import { ReactElement, useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import TippyHeadLess from '../TippyHeadLess';
import styles from './TippyMore.module.scss';

interface TippyMoreProps {
    dropdown: ReactElement;
}

function TippyMore({ dropdown }: TippyMoreProps) {
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

export default TippyMore;
