import { useEffect, useRef, useState } from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { useSlate } from 'slate-react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { ButtonProps, checkOverflow } from '.';
import styles from './ButtonToolbar.module.scss';
import useWindowSize from '~/hooks/useWindowSize';
import { toolbarConfig } from '~/config';

const cx = classNames.bind(styles);

function BlockButton({ format, children, content, className, status }: ButtonProps) {
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

export default BlockButton;

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const isBlockActive = (editor: any, format: any, type = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[type] === format,
        })
    );

    return !!match;
};

export const toggleBlock = (editor: any, format: any) => {
    const isList = LIST_TYPES.includes(format);
    const isTextAlign = TEXT_ALIGN_TYPES.includes(format);
    const isFontSize = toolbarConfig.fontSize.includes(format);
    const isColor = toolbarConfig.color.includes(format);

    let type = 'type';
    if (isTextAlign) type = 'align';
    if (isFontSize) type = 'fontSize';
    if (isColor) type = 'color';

    const isActive = isBlockActive(editor, format, type);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !isTextAlign &&
            !isFontSize,
        split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (isColor) {
        newProperties = {
            color: isActive ? undefined : format,
        };
    } else if (isFontSize) {
        newProperties = {
            fontSize: isActive ? undefined : format,
        };
    } else if (isTextAlign) {
        newProperties = {
            align: isActive ? undefined : format,
        };
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        };
    }

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};
