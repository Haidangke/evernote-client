import { useSlate } from 'slate-react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import {
    isBlockActive,
    isMarkActive,
    toggleBlock,
    toggleMark,
} from '~/pages/NotePage/components/NoteEditor/Component';
import styles from './ButtonToolbar.module.scss';
import { useState } from 'react';
import Popper from '~/components/Popper';
const cx = classNames.bind(styles);

interface Button {
    format: string;
    content: string;
    children: any;
    className?: string;
    onClick?: () => void;
}

interface DropDown {
    children: any;
    className?: string;
    dropdown: any;
    content?: string;
}

interface Handle {
    children: any;
    onClick: () => any;
    className?: string;
    content: string;
}

export const BlockButton = ({ format, children, content, onClick, className }: Button) => {
    const editor = useSlate();
    return (
        <Tippy placement={'bottom'} content={content}>
            <button
                value={format}
                className={`${cx('btn', {
                    'btn-active': isBlockActive(editor, format),
                })}  ${className || ''}`}
                onClick={
                    onClick
                        ? onClick
                        : (event: any) => {
                              event.preventDefault();
                              toggleBlock(editor, format);
                          }
                }
            >
                {children}
            </button>
        </Tippy>
    );
};

export const MarkButton = ({ format, children, content, onClick, className }: Button) => {
    const editor = useSlate();
    return (
        <Tippy placement={'bottom'} content={content}>
            <button
                value={format}
                className={`${cx('btn', {
                    'btn-active': isMarkActive(editor, format),
                })}  ${className || ''}`}
                onClick={
                    onClick
                        ? onClick
                        : (event: any) => {
                              event.preventDefault();
                              toggleMark(editor, format);
                          }
                }
            >
                {children}
            </button>
        </Tippy>
    );
};

export const DropDownButton = ({ children, className, dropdown, content }: DropDown) => {
    const [visible, setVisible] = useState(false);
    const Dropdown = dropdown;
    return (
        <TippyHeadless
            content={content}
            placement='bottom-start'
            interactive
            visible={visible}
            onClickOutside={() => setVisible(false)}
            render={(attrs) => (
                <Popper>
                    <Dropdown {...attrs} />
                </Popper>
            )}
        >
            <button
                onClick={() => setVisible(!visible)}
                className={`${cx('dropdown-btn', 'btn')}  ${className || ''}`}
            >
                {children}
            </button>
        </TippyHeadless>
    );
};

export const HandleButton = ({ children, onClick, className, content }: Handle) => {
    return (
        <TippyHeadless
            placement='bottom-start'
            interactive
            render={(attrs) => (
                <div className={cx('tippy-content')} {...attrs}>
                    {content}
                </div>
            )}
        >
            <button onClick={onClick} className={`${cx('btn')}  ${className || ''}`}>
                {children}
            </button>
        </TippyHeadless>
    );
};
