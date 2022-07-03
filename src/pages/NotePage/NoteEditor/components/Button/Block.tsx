import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { ButtonProps } from '.';
import { useAppDispatch } from 'app/hooks';
import { toolbarActions } from 'app/slice/toolbarSlice';

import styles from './Button.module.scss';
import { isBlockActive, toggleBlock } from '../../utils/block';
import useCheckOverflow from 'hooks/useCheckOverflow';
import { overflowToolbar } from 'config/toolbar';

const cx = classNames.bind(styles);

function Block({ format, children, content, className }: ButtonProps) {
    const dispatch = useAppDispatch();
    const editor = useSlate();
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const limit = overflowToolbar.find((item) => item.format === format)?.limit || 0;
    const check = useCheckOverflow(limit); 

    useEffect(() => {
        if (check !== undefined) {
            setIsOverflow(!check);
            dispatch(toolbarActions.setOverflow({ format, value: !check }));
        }
    }, [dispatch, format, check]);

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
                    value={format}
                    className={`${cx('btn', {
                        'btn-active': isBlockActive(editor, format),
                    })}  ${className || ''}`}
                    onClick={(event: any) => {
                        event.preventDefault();
                        toggleBlock(editor, format);
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

export default Block;