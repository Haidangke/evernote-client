import classNames from 'classnames/bind';
import Editor from './Editor';
import styles from './NoteEditor.module.scss';
import Topbar from './Topbar';

const cx = classNames.bind(styles);

function NoteEditor() {
    return (
        <div className={cx('wrapper')}>
            <Topbar />
            <Editor />
        </div>
    );
}

export default NoteEditor;
