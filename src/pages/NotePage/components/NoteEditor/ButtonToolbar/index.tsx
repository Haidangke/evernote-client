import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

import BlockButton from './BlockButton';
import DropdownButton from './DropdownButton';
import HandleButton from './HandleButton';
import MarkButton from './MarkButton';

type CustomElement = { type: string; children: CustomText[]; [key: string]: any };
type CustomText = { text: string };

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

export interface ButtonProps {
    format: string;
    content?: string;
    children: any;
    className?: string;
    status?: 'column' | 'row';
}

export const checkOverflow = (textContainer: any, width: any): boolean => {
    if (textContainer) {
        const rect = textContainer.getBoundingClientRect();

        return rect.right + 100 < width;
    }

    return false;
};

export { BlockButton, MarkButton, HandleButton, DropdownButton };
