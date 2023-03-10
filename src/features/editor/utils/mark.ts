import { fontFamilies, fontSizes, colors } from 'config/toolbar';
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

    const isFontSize = fontSizes.includes(format);
    const isColor = colors.includes(format);
    const isFontFamily = fontFamilies.map((item) => item.value).includes(format);

    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        for (const mark in marks) {
            if (fontSizes.includes(mark) && isFontSize) {
                Editor.removeMark(editor, mark);
            }
            if (fontFamilies.map((item) => item.value).includes(mark) && isFontFamily) {
                Editor.removeMark(editor, mark);
            }
            if (colors.includes(mark) && isColor) {
                Editor.removeMark(editor, mark);
            }
        }
        Editor.addMark(editor, format, true);
    }
};

export { isMarkActive, toggleMark, getMarks };
