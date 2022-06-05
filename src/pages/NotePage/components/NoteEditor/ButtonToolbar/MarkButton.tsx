import { useEffect, useRef, useState } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import TippyHeadless from '@tippyjs/react/headless';

import { ButtonProps, checkOverflow } from '.';
import styles from './ButtonToolbar.module.scss';
import classNames from 'classnames/bind';
import useWindowSize from '~/hooks/useWindowSize';

const cx = classNames.bind(styles);

function MarkButton({ format, children, content, className }: ButtonProps) {
    const editor = useSlate();

    const [width] = useWindowSize();
    const [overflowActive, setOverflowActive] = useState<boolean>(true);
    const overflowingRef = useRef(null);

    useEffect(() => {
        setOverflowActive(checkOverflow(overflowingRef.current, width));
    }, [width]);

    return overflowActive ? (
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

export default MarkButton;

export const isMarkActive = (editor: any, format: any) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: any, format: any) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};
