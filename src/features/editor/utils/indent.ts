import { Element, Transforms } from 'slate';
import { LIST_TYPES } from './block';

export const textIndent = (editor: any, type: 'indent' | 'outdent') => {
    const increment = type === 'indent' ? 30 : -30;

    const { selection, children } = editor;
    console.log({ selection, children });
    if (!selection) return;
    const index = selection.anchor.path[0];

    const element = children[index];

    const typeElement = element.type;

    if (LIST_TYPES.includes(typeElement)) {
    } else {
        const curPaddingLeft = children[index].paddingLeft
            ? parseInt(children[index].paddingLeft.replace('px', ''))
            : 0;
        const align = children[index].align;
        const valuePadding = curPaddingLeft + increment;
        const paddingLeft = valuePadding + 'px';

        if (
            (type === 'indent' && valuePadding <= 240) ||
            (type === 'outdent' && valuePadding >= 0 && align !== 'right')
        ) {
            Transforms.setNodes<Element>(editor, { paddingLeft });
        }
    }
};
