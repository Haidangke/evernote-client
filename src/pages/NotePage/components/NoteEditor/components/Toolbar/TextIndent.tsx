import { IndentIcon, OutdentIcon } from '~/assets/icons/toolbar';
import { textIndent } from '../../utils/indent';
import { HandleButton } from '../Button';

const TextIndent = ({ editor }: any) => {
    return (
        <>
            <HandleButton
                format='indent'
                content='Indent'
                handle={() => textIndent(editor, 'indent')}
            >
                <IndentIcon />
            </HandleButton>
            <HandleButton
                format='outdent'
                content='Outdent'
                handle={() => textIndent(editor, 'outdent')}
            >
                <OutdentIcon />
            </HandleButton>
        </>
    );
};

export default TextIndent;
