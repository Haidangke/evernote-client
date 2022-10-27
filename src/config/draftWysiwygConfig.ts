import {
    BoldIcon,
    UndoTcon,
    RedoIcon,
    ItalicIcon,
    UnderlineIcon,
    SubScriptIcon,
    UpperIndexIcon,
    BulletedListIcon,
    NumberListIcon,
    IndentIcon,
    OutdentIcon,
    LinkIcon,
    LineThrougnIcon,
} from 'components/Icons/ToolbarIcons';

export const draftWysiwygConfig = [
    { title: 'Undo', icon: UndoTcon },
    { title: 'Bold', icon: BoldIcon },
    { title: 'Redo', icon: RedoIcon },
    { title: 'Italic', icon: ItalicIcon },
    { title: 'Underline', icon: UnderlineIcon },
    { title: 'Strikethrough', icon: LineThrougnIcon },

    { title: 'Superscript', icon: SubScriptIcon },
    { title: 'Subscript', icon: UpperIndexIcon },
    { title: 'Unordered', icon: BulletedListIcon },
    { title: 'Ordered', icon: NumberListIcon },
    { title: 'Indent', icon: IndentIcon },
    { title: 'Outdent', icon: OutdentIcon },
    { title: 'Link', icon: LinkIcon },
];
