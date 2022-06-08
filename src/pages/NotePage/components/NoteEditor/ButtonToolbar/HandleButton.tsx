import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import useWindowSize from '~/hooks/useWindowSize';
import { checkOverflow } from '.';

import styles from './ButtonToolbar.module.scss';

interface HandleButtonProps {
    children: any;
    onClick: () => any;
    className?: string;
    content: string;
    disable?: boolean;
}

const cx = classNames.bind(styles);

function HandleButton({ children, onClick, className, content, disable }: HandleButtonProps) {
    const [width] = useWindowSize();
    const [overflowActive, setOverflowActive] = useState<boolean>(true);
    const overflowingRef = useRef(null);

    useEffect(() => {
        setOverflowActive(checkOverflow(overflowingRef.current, width));
    }, [width]);

    return overflowActive ? (
        <div>
            <TippyHeadless
                placement='bottom-start'
                interactive
                delay={[500, 0]}
                render={(attrs) => (
                    <div className={cx('tippy-content')} {...attrs}>
                        {content}
                    </div>
                )}
            >
                <button
                    disabled={disable !== undefined ? disable : false}
                    ref={overflowingRef}
                    onClick={onClick}
                    className={`${cx('btn')}  ${className || ''}`}
                >
                    {children}
                </button>
            </TippyHeadless>
        </div>
    ) : (
        <></>
    );
}

export default HandleButton;
