import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import TippyHeadLess from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { ButtonProps } from '.';
import { useAppDispatch } from 'app/hooks';
import { editorActions } from 'features/editor/editorSlice';

import { isBlockActive, toggleBlock } from '../../utils/block';
import useCheckOverflow from '../../hooks/useCheckOverflow';
import { limitBtns } from 'config/toolbar';

import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Block({ format, children, content, className }: ButtonProps) {
    const dispatch = useAppDispatch();
    const editor = useSlate();
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const limit = limitBtns.find((item) => item.format === format)?.limit || 0;
    const check = useCheckOverflow(limit);

    useEffect(() => {
        if (check !== undefined) {
            setIsOverflow(!check);
            dispatch(editorActions.setOverflow({ format, value: !check }));
        }
    }, [dispatch, format, check]);

    return !isOverflow ? (
        <div>
            <TippyHeadLess
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
            </TippyHeadLess>
        </div>
    ) : (
        <></>
    );
}

export default Block;
