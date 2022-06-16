import { Editor, Transforms, Element as SlateElement } from 'slate';
import { toolbarConfig } from 'config';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const isBlockActive = (editor: any, format: any, type = 'type') => {
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

const toggleBlock = (editor: any, format: any) => {
    const isList = LIST_TYPES.includes(format);
    const isTextAlign = TEXT_ALIGN_TYPES.includes(format);
    const isFontSize = toolbarConfig.fontSize.includes(format);
    const isColor = toolbarConfig.color.includes(format);

    const isFontFamily = toolbarConfig.fontFamily.map((item) => item.value).includes(format);

    let type = 'type';
    if (isTextAlign) type = 'align';
    if (isFontSize) type = 'fontSize';
    if (isColor) type = 'color';
    if (isFontFamily) type = 'isFontFamily';

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
    } else if (isFontFamily) {
        newProperties = {
            fontFamily: isActive ? undefined : format,
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

export { isBlockActive, toggleBlock };