import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '~/app/hooks';
import { toolbarActions } from '~/app/slice/toolbarSlice';
import useWindowSize from '~/hooks/useWindowSize';
import checkOverflow from '../../utils/checkOverflow';

import styles from './Button.module.scss';

interface HandleProps {
    children: any;
    handle: () => any;
    className?: string;
    content: string;
    disable?: boolean;
    format?: string;
    modal?: any;
}

const cx = classNames.bind(styles);

function Handle({ children, handle, className, content, disable, format, modal }: HandleProps) {
    const dispatch = useAppDispatch();
    const [width] = useWindowSize();
    const [isOverflow, setIsOverflow] = useState<boolean>(false);
    const overflowingRef = useRef(null);

    useEffect(() => {
        if (width === 0) return;

        const check = checkOverflow(overflowingRef.current, width);
        setIsOverflow(!check);

        format && dispatch(toolbarActions.setOverflow({ format, value: !check }));
    }, [dispatch, format, width]);

    return !isOverflow ? (
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
                    onClick={handle}
                    className={cx('btn', {
                        className,
                    })}
                >
                    {children}
                </button>
            </TippyHeadless>
            {modal}
        </div>
    ) : (
        <></>
    );
}

export default Handle;
