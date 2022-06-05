import classNames from 'classnames/bind';
import SlateEditor from './SlateEditor';
import styles from './NoteEditor.module.scss';
import Topbar from './Topbar';
import { useRef, useState } from 'react';
import useOnClickOutside from '~/hooks/useOnclickOutside';

const cx = classNames.bind(styles);

function NoteEditor() {
    const [isToolbar, setIsToolbar] = useState(false);

    const editorRef = useRef(null);

    useOnClickOutside(editorRef, () => setIsToolbar(false));
    return (
        <div ref={editorRef} className={cx('wrapper')}>
            <Topbar />
            <SlateEditor isToolbar={isToolbar} setIsToolbar={setIsToolbar} />
        </div>
    );
}

export default NoteEditor;
