import { Editor } from 'slate';

const isMarkActive = (editor: any, format: any) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor: any, format: any) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export { isMarkActive, toggleMark };