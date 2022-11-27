import { ReactElement, useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import TippyHeadLess from '../TippyHeadLess';
import styles from './TippyMore.module.scss';

interface TippyMoreProps {
    dropdown: ReactElement;
    className?: string;
    isMore?: boolean;
    setIsMore?: (isMore: boolean) => void;
}

function TippyMore({ dropdown, className, isMore, setIsMore }: TippyMoreProps) {
    const [isMoreState, setIsMoreState] = useState(false);
    return (
        <TippyHeadLess
            dropdown={dropdown}
            visible={isMore || isMoreState}
            setVisible={setIsMore || setIsMoreState}
            className={className}
            placement='bottom-end'
        >
            <div
                onClick={() => {
                    setIsMore ? setIsMore(!isMore) : setIsMoreState(!isMoreState);
                }}
                className={styles.more}
            >
                <IoIosMore />
            </div>
        </TippyHeadLess>
    );
}

export default TippyMore;
