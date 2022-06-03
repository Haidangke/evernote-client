import React from 'react';
import Tippy from '@tippyjs/react';
type Placement = 'top' | 'bottom' | 'left' | 'right';
interface ButtonTippyProps {
    children: any;
    onClick?: () => void;
    content: string;
    placement: Placement;
    className?: string;
    width?: string | number;
    height?: string | number;
}

function ButtonTippy({
    children,
    onClick,
    content,
    placement,
    className,
    width,
    height,
}: ButtonTippyProps) {
    return (
        <Tippy content={content} placement={placement}>
            <button className={className} style={{ width, height }} onClick={onClick}>
                {children}
            </button>
        </Tippy>
    );
}

export default ButtonTippy;
