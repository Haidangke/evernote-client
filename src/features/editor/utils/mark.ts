import { toolbarConfig } from 'config';
import { Editor } from 'slate';

const isMarkActive = (editor: any, format: any) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const getMarks = (editor: any) => {
    const marks: any = Editor.marks(editor);
    return marks ? Object.keys(marks) : [];
};

const toggleMark = (editor: any, format: any) => {
    const marks: any = Editor.marks(editor);

    const isFontSize = toolbarConfig.fontSize.includes(format);
    const isColor = toolbarConfig.color.includes(format);
    const isFontFamily = toolbarConfig.fontFamily.map((item) => item.value).includes(format);

    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        for (const mark in marks) {
            if (toolbarConfig.fontSize.includes(mark) && isFontSize) {
                Editor.removeMark(editor, mark);
            }
            if (toolbarConfig.fontFamily.map((item) => item.value).includes(mark) && isFontFamily) {
                Editor.removeMark(editor, mark);
            }
            if (toolbarConfig.color.includes(mark) && isColor) {
                Editor.removeMark(editor, mark);
            }
        }
        Editor.addMark(editor, format, true);
    }
};

export { isMarkActive, toggleMark, getMarks };
