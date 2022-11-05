import { ListType, withLists } from '@prezly/slate-lists';
import { Element, Node } from 'slate';
import { ElementType } from '../slates';

const withListsPlugin = withLists({
    isConvertibleToListTextNode(node: Node) {
        return Element.isElementType(node, ElementType.PARAGRAPH);
    },
    isDefaultTextNode(node: Node) {
        return Element.isElementType(node, ElementType.PARAGRAPH);
    },
    isListNode(node: Node, type?: ListType) {
        if (type) {
            const nodeType =
                type === ListType.ORDERED ? ElementType.NUMBERED_LIST : ElementType.BULLETED_LIST;
            return Element.isElementType(node, nodeType);
        }
        return (
            Element.isElementType(node, ElementType.NUMBERED_LIST) ||
            Element.isElementType(node, ElementType.BULLETED_LIST)
        );
    },
    isListItemNode(node: Node) {
        return Element.isElementType(node, ElementType.LIST_ITEM);
    },
    isListItemTextNode(node: Node) {
        return Element.isElementType(node, ElementType.LIST_ITEM_TEXT);
    },
    createDefaultTextNode(props = {}) {
        return { children: [{ text: '' }], ...props, type: ElementType.PARAGRAPH };
    },
    createListNode(type: ListType = ListType.UNORDERED, props = {}) {
        const nodeType =
            type === ListType.ORDERED ? ElementType.NUMBERED_LIST : ElementType.BULLETED_LIST;
        return { children: [{ text: '' }], ...props, type: nodeType };
    },
    createListItemNode(props = {}) {
        return { children: [{ text: '' }], ...props, type: ElementType.LIST_ITEM };
    },
    createListItemTextNode(props = {}) {
        return { children: [{ text: '' }], ...props, type: ElementType.LIST_ITEM_TEXT };
    },
});

export default withListsPlugin;
