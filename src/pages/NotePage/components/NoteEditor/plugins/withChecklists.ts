import { Editor, Range, Transforms, Element as SlateElement, Point } from 'slate';

const withChecklists = (editor: any) => {
    const { deleteBackward } = editor;

    editor.deleteBackward = (...args: any) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [match]: any = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    (n.type as string) === 'check-list-item',
            });

            if (match) {
                const [, path] = match;
                const start = Editor.start(editor, path);

                if (Point.equals(selection.anchor, start)) {
                    const newProperties: Partial<SlateElement> = {
                        type: 'paragraph',
                    };
                    Transforms.setNodes(editor, newProperties, {
                        match: (n) =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            (n.type as string) === 'check-list-item',
                    });
                    return;
                }
            }
        }

        deleteBackward(...args);
    };

    return editor;
};

export default withChecklists;
