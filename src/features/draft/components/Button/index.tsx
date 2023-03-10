import BlockButton from './Block';
import DropdownButton from './Dropdown';
import HandleButton from './Handle';
import InlineButton from './Inline';

export interface ButtonProps {
    format: string;
    content?: string;
    children: any;
    className?: string;
    onClick: any;
    tippy?: string;
    active?: boolean;
}

export { BlockButton, InlineButton, HandleButton, DropdownButton };
