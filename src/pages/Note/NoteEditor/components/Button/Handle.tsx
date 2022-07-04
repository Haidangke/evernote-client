import { useEffect, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { useAppDispatch } from 'app/hooks';
import useCheckOverflow from 'hooks/useCheckOverflow';
import { toolbarActions } from 'app/slice/toolbarSlice';

import { overflowToolbar } from 'config/toolbar';
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
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const limit = overflowToolbar.find((item) => item.format === format)?.limit || 0;
    const check = useCheckOverflow(limit);
    useEffect(() => {
        if (check !== undefined && format) {
            setIsOverflow(!check);
            dispatch(toolbarActions.setOverflow({ format, value: !check }));
        }
    }, [dispatch, format, check]);

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