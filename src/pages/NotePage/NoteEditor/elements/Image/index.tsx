import { Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react';
import { insertImage, isImageUrl } from '../../plugins/withImages';

const Image = ({ attributes, children, element }: any) => {
    const editor = useSlateStatic();
    const path = ReactEditor.findPath(editor, element);

    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            {children}
            <div contentEditable={false}>
                <button onClick={() => Transforms.removeNodes(editor, { at: path })}>Delete</button>
                <img src={element.url} alt='images' />
            </div>
        </div>
    );
};

export default Image;
