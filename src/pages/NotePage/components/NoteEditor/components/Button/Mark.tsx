import { useEffect, useRef, useState } from 'react';
import { useSlate } from 'slate-react';
import TippyHeadless from '@tippyjs/react/headless';

import { ButtonProps } from '.';

import useWindowSize from '~/hooks/useWindowSize';
import { useAppDispatch } from '~/app/hooks';
import { toolbarActions } from '~/app/slice/toolbarSlice';
import { isMarkActive, toggleMark } from '../../utils/mark';

import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import checkOverflow from '../../utils/checkOverflow';

const cx = classNames.bind(styles);

function Mark({ format, children, content, className }: ButtonProps) {
    const editor = useSlate();
    const dispatch = useAppDispatch();

    const [width] = useWindowSize();
    const [isOverflow, setIsOverflow] = useState<boolean>(false);
    const overflowingRef = useRef(null);

    useEffect(() => {
        if (width === 0) return;
        const check = checkOverflow(overflowingRef.current, width);
        setIsOverflow(!check);

        dispatch(toolbarActions.setOverflow({ format, value: !check }));
    }, [dispatch, format, width]);

    return !isOverflow ? (
        <div>
            <TippyHeadless
                delay={[500, 0]}
                placement={'bottom'}
                render={(attrs) => (
                    <div className={cx('tippy-content')} {...attrs}>
                        {content}
                    </div>
                )}
            >
                <button
                    ref={overflowingRef}
                    value={format}
                    className={`${cx('btn', {
                        'btn-active': isMarkActive(editor, format),
                    })}  ${className || ''}`}
                    onClick={(event: any) => {
                        event.preventDefault();
                        toggleMark(editor, format);
                    }}
                >
                    {children}
                </button>
            </TippyHeadless>
        </div>
    ) : (
        <></>
    );
}

export default Mark;
