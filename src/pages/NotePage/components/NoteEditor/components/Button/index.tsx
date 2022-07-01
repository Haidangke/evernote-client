import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

import BlockButton from './Block';
import DropdownButton from './Dropdown';
import HandleButton from './Handle';
import MarkButton from './Mark';

type CustomElement = { type: string; children: CustomText[]; [key: string]: any };
type CustomText = any;

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
}

export { BlockButton, MarkButton, HandleButton, DropdownButton };
