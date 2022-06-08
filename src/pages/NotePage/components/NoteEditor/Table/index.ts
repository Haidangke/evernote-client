import { Editor, Range, Element as SlateElement, Point, Transforms } from 'slate';

export const withTables = (editor: any) => {
    const { deleteBackward, deleteForward, insertBreak } = editor;

    editor.deleteBackward = (unit: any) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [cell]: any = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table-cell',
            });

            if (cell) {
                const [, cellPath] = cell;
                const start = Editor.start(editor, cellPath);

                if (Point.equals(selection.anchor, start)) {
                    return;
                }
            }
        }

        deleteBackward(unit);
    };

    editor.deleteForward = (unit: any) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [cell]: any = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table-cell',
            });

            if (cell) {
                const [, cellPath] = cell;
                const end = Editor.end(editor, cellPath);

                if (Point.equals(selection.anchor, end)) {
                    return;
                }
            }
        }

        deleteForward(unit);
    };

    editor.insertBreak = () => {
        const { selection } = editor;

        if (selection) {
            const [table]: any = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
            });

            if (table) {
                return;
            }
        }

        insertBreak();
    };

    return editor;
};

export const insertTable = (editor: any) => {
    const table = {
        type: 'table',
        children: [
            {
                type: 'table-row',
                children: [
                    {
                        type: 'table-cell',
                        children: [{ text: '' }],
                    },
                    {
                        type: 'table-cell',
                        children: [{ text: '' }],
                    },
                    {
                        type: 'table-cell',
                        children: [{ text: '' }],
                    },
                ],
            },
            {
                type: 'table-row',
                children: [
                    {
                        type: 'table-cell',
                        children: [{ text: '' }],
                    },
                    {
                        type: 'table-cell',
                        children: [{ text: '' }],
                    },
                    {
                        type: 'table-cell',
                        children: [{ text: '' }],
                    },
                ],
            },
        ],
    };
    Transforms.insertNodes(editor, table);
};

export const insertRow = (editor: any) => {
    const table = {
        type: 'table-row',
        children: [
            {
                type: 'table-cell',
                children: [{ text: '' }],
            },
            {
                type: 'table-cell',
                children: [{ text: '' }],
            },
            {
                type: 'table-cell',
                children: [{ text: '' }],
            },
        ],
    };
    Transforms.insertNodes(editor, table);
};
