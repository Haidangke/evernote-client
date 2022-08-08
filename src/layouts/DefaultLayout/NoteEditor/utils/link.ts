import { Editor, Transforms, Path, Range, Element } from 'slate';
import { ReactEditor } from 'slate-react';

export const createLinkNode = (href: string, text: string) => ({
    type: 'link',
    href,
    children: [{ text }],
});

export const insertLink = (editor: any, url: string | null, name: string) => {
    if (!url) return;

    const { selection } = editor;
    const link = createLinkNode(url, name);
    ReactEditor.focus(editor);

    if (!!selection) {
        const [parentNode, parentPath]: any = Editor.parent(editor, selection.focus?.path);

        if (parentNode.type === 'link') {
            removeLink(editor);
        }

        if (editor.isVoid(parentNode)) {
            Transforms.insertNodes(editor, createParagraphNode([link]), {
                at: Path.next(parentPath),
                select: true,
            });
        } else if (Range.isCollapsed(selection)) {
            Transforms.insertNodes(editor, link, { select: true });
        } else {
            Transforms.wrapNodes(editor, link, { split: true });
            Transforms.collapse(editor, { edge: 'end' });
        }
    } else {
        Transforms.insertNodes(editor, createParagraphNode([link]));
    }
};

export const removeLink = (editor: any, opts = {}) => {
    Transforms.unwrapNodes(editor, {
        ...opts,
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });
};

export const createParagraphNode = (children: any = [{ text: '' }]) => ({
    type: 'paragraph',
    children,
});
