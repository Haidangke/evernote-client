import { useAppSelector } from 'app/hooks';
import { limits } from 'config/toolbar';
import { ReactElement } from 'react';
import DropdownButton from './Dropdown';
import HandleButton from './Handle';
import InlineButton from './Inline';

export interface ButtonProps {
    format: string;
    children: any;
    onClick: any;
    tippy?: string;
    active?: boolean;
    disable?: boolean;
}

interface WrapperButtonProps {
    format?: string;
    children: ReactElement;
}

export const WrapperButton = ({ format, children }: WrapperButtonProps) => {
    const { width } = useAppSelector((state) => state.draft);
    if (!format) {
        return children;
    } else {
        const check = limits[format] + 60 < width;
        return check ? children : <></>;
    }
};

export { InlineButton, HandleButton, DropdownButton };
