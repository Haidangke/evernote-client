import { Transforms, Element } from 'slate';

const withIndent = (editor: any) => {
    const { deleteBackward } = editor;

    editor.deleteBackward = (...args: any) => {
        const { selection, children } = editor;
        const offset = selection.anchor.offset;

        const paddingLeft = children[selection.anchor.path[0]].paddingLeft;
        if (offset === 0) {
            const indent = paddingLeft
                ? Number(paddingLeft.slice(0, paddingLeft.length - 2))
                : undefined;
            if (indent === 0 || !indent) {
                deleteBackward(...args);
            } else {
                const nextIndent = indent - 30 + 'px';
                Transforms.setNodes<Element>(editor, { paddingLeft: nextIndent });
            }
        } else {
            deleteBackward(...args);
        }
    };

    return editor;
};

export default withIndent;
