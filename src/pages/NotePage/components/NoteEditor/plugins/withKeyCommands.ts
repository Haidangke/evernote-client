import { Editor, Node, Path, Transforms } from 'slate';
import { createParagraphNode } from '../utils/link';

const withKeyCommands = (editor: any) => {
    const { deleteBackward, insertBreak, isVoid } = editor;

    editor.deleteBackward = (...args: any) => {
        const [parentNode, parentPath] = Editor.parent(editor, editor.selection.focus.path);

        if (isVoid(parentNode) || !Node.string(parentNode).length) {
            Transforms.removeNodes(editor, { at: parentPath });
        } else {
            deleteBackward(...args);
        }
    };

    editor.insertBreak = (...args: any) => {
        const [parentNode, parentPath] = Editor.parent(editor, editor.selection.focus.path);

        if (isVoid(parentNode)) {
            const nextPath = Path.next(parentPath);
            Transforms.insertNodes(editor, createParagraphNode(), {
                at: nextPath,
                select: true,
            });
        } else {
            insertBreak(...args);
        }
    };

    return editor;
};

export default withKeyCommands;
