import { Element, Transforms } from 'slate';

export const textIndent = (editor: any, type: 'indent' | 'outdent') => {
    const increment = type === 'indent' ? 30 : -30;

    const { selection, children } = editor;
    if (!selection) return;

    const index = selection.anchor.path[0];
    const curPaddingLeft = children[index].paddingLeft
        ? parseInt(children[index].paddingLeft.replace('px', ''))
        : 0;

    const valuePadding = curPaddingLeft + increment;
    const paddingLeft = valuePadding + 'px';

    if ((type === 'indent' && valuePadding <= 240) || (type === 'outdent' && valuePadding >= 0)) {
        Transforms.setNodes<Element>(editor, { paddingLeft });
    }
};
