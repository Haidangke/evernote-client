import { EditorBlock } from 'draft-js';
import { updateDataOfBlock } from 'features/draft/utils/draft.utils';

function CheckListItem(props: any) {
    const data = props.block.getData();
    const checked = data.get('checked') === true;

    const updateData = () => {
        const { block, blockProps } = props;

        const { onChange, editorState } = blockProps;
        const data = block.getData();
        const checked = data.has('checked') && data.get('checked') === true;
        const newData = data.set('checked', !checked);
        onChange(updateDataOfBlock(editorState, block, newData));
    };
    return (
        <>
            <input type='checkbox' checked={checked} onChange={updateData} />
            <EditorBlock {...props} />
        </>
    );
}
export default CheckListItem;
