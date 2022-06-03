import classNames from 'classnames/bind';
import styles from './Note.module.scss';

import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

const cx = classNames.bind(styles);

function Note() {
    return (
        <div className={cx('wrapper')}>
            <NoteList />
            <NoteEditor />
        </div>
    );
}

export default Note;
