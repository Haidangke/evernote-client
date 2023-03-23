import { ContentBlock, ContentState, EditorState, RichUtils } from 'draft-js';

import { IndentIcon, OutdentIcon } from 'components/Icons';
import { DraftToolProps } from '.';
import { HandleButton } from '../Button';

function Indent({ onChange, editorState }: DraftToolProps) {
    const getDepth = (state: any) => {
        const contentState = state.getCurrentContent();
        const selectionState = state.getSelection();
        const currentBlock = contentState.getBlockForKey(selectionState.getStartKey());
        return currentBlock.getDepth();
    };

    const handleOutdent = () => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const blockKey = selectionState.getStartKey();
        const block = contentState.getBlockForKey(blockKey);
        const currentIndent = block.getDepth();

        const newDepth = Math.max(currentIndent - 1, 0);

        const newBlockData = block.merge({ depth: newDepth }) as ContentBlock;

        const newContentState = contentState.merge({
            blockMap: contentState.getBlockMap().set(block.getKey(), newBlockData),
        }) as ContentState;

        const newEditorState = EditorState.push(editorState, newContentState, 'adjust-depth');
        onChange(newEditorState);
    };

    return (
        <>
            <HandleButton
                format='INDENT'
                tippy='Indent'
                disable={getDepth(editorState) === 4}
                handle={(event) => {
                    const updatedState = RichUtils.onTab(event, editorState, 4);
                    onChange(updatedState);
                }}
            >
                <IndentIcon />
            </HandleButton>
            <HandleButton
                disable={getDepth(editorState) === 0}
                format='OUTDENT'
                tippy='Outdent'
                handle={handleOutdent}
            >
                <OutdentIcon />
            </HandleButton>
        </>
    );
}

export default Indent;
