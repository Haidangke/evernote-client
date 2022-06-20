import Tippy from '@tippyjs/react';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TippyButtonProps {
    children: any;
    onClick?: () => void;
    content: string;
    placement: Placement;
    className?: string;
    width?: string | number;
    height?: string | number;
}

function TippyButton({
    children,
    onClick,
    content,
    placement,
    className,
    width,
    height,
}: TippyButtonProps) {
    return (
        <Tippy content={content} placement={placement}>
            <button className={className} style={{ width, height }} onClick={onClick}>
                {children}
            </button>
        </Tippy>
    );
}

export default TippyButton;
