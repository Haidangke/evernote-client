import { ContentBlock, ContentState, EditorState } from 'draft-js';

const updateDataOfBlock = (
    editorState: EditorState,
    block: ContentBlock,
    newData: ContentBlock
) => {
    const contentState = editorState.getCurrentContent();
    const newBlock = block.merge({
        data: newData,
    }) as ContentBlock;
    const newContentState = contentState.merge({
        blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
    }) as ContentState;
    return EditorState.push(editorState, newContentState, 'change-block-type');
};

function findLinkEntities(contentBlock: ContentBlock, callback: any, contentState: ContentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
}



export { updateDataOfBlock, findLinkEntities };
