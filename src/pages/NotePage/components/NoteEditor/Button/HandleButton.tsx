import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '~/app/hooks';
import { toolbarActions } from '~/app/slice/toolbarSlice';
import useWindowSize from '~/hooks/useWindowSize';
import { checkOverflow } from '.';

import styles from './ButtonToolbar.module.scss';

interface HandleButtonProps {
    children: any;
    handle: () => any;
    className?: string;
    content: string;
    disable?: boolean;
    format?: string;
}

const cx = classNames.bind(styles);

function HandleButton({
    children,
    handle,
    className,
    content,
    disable,
    format,
}: HandleButtonProps) {
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
        </div>
    ) : (
        <></>
    );
}

export default HandleButton;
