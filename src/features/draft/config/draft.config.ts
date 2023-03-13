import {
    CompositeDecorator,
    ContentBlock,
    DefaultDraftBlockRenderMap,
    EditorState,
    getDefaultKeyBinding,
    RichUtils,
} from 'draft-js';
import { Map } from 'immutable';

import { aligns, colors, fontFamilies, fontSizes } from 'config/toolbar';
import { convertItemStyleMap } from 'utils/ArrayUtils';
import CheckListItem from '../components/CheckListItem';
import { Link } from '../components/Toolbar/LinkEditor';
import { findLinkEntities } from '../utils/draft.utils';

const CHECK_LIST_ITEM = 'check-list-item';
const ALIGN_LEFT = 'left';
const ALIGN_RIGHT = 'right';
const ALIGN_CENTER = 'center';

const customStyleMaps = [
    {
        group: 'FONT_FAMILY',
        exclusive: true,
        styles: {
            ...convertItemStyleMap(
                fontFamilies.map((font) => font.value),
                'fontFamily'
            ),
        },
    },
    {
        group: 'FONT_SIZE',
        exclusive: true,
        styles: {
            ...convertItemStyleMap(fontSizes, 'fontSize'),
        },
    },
    {
        group: 'COLOR',
        exclusive: true,
        styles: {
            ...convertItemStyleMap(colors, 'color'),
        },
    },
    {
        group: 'ALIGN',
        exclusive: true,
        styles: {
            ...convertItemStyleMap(
                aligns.map((align) => align.value),
                'textAlign'
            ),
        },
    },
];

const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
        case ALIGN_CENTER:
            return 'draft-align__center';
        case ALIGN_LEFT:
            return 'draft-align__left';
        case ALIGN_RIGHT:
            return 'draft-align__right';
        case CHECK_LIST_ITEM:
            return 'draft-check-list-item';

        default:
            return 'unstyled';
    }
};

const getBlockRendererFn = (editorState: EditorState, onChange: any) => (block: ContentBlock) => {
    const type = block.getType();
    switch (type) {
        case CHECK_LIST_ITEM:
            return {
                component: CheckListItem,
                props: {
                    editorState,
                    onChange,
                },
            };
        default:
            return null;
    }
};

const blockRenderMap = Map({
    [CHECK_LIST_ITEM]: {
        element: 'div',
    },
}).merge(DefaultDraftBlockRenderMap);

const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
]);

function keyBindingFn(event: any, editorState: EditorState, onChange: any) {
    const key = event.key;
    switch (key) {
        case 'Tab': {
            const updatedState = RichUtils.onTab(event, editorState, 4);
            onChange(updatedState);
            return null;
        }
        default:
            return getDefaultKeyBinding(event);
    }
}

export {
    customStyleMaps,
    myBlockStyleFn,
    getBlockRendererFn,
    blockRenderMap,
    decorator,
    keyBindingFn,
};
