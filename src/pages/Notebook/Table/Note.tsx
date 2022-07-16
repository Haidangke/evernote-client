import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { NoteSolidIcon } from 'assets/icons';
import TimeUp from 'pages/Note/NoteList/components/List/TimeUp';
import { TippyNoteMore } from 'components/Tippy';
import { Note, Tag } from 'types';

import styles from './Table.module.scss';

type NoteProps = {
    note: Note<Tag>;
};

const cx = classNames.bind(styles);
function NoteRow({ note }: NoteProps) {
    const navigate = useNavigate();
    const handleToNote = (_id: string) => {
        navigate({
            pathname: '/note',
            search: '?noteId=' + _id,
        });
    };
    return (
        <div key={note._id} className={styles.row}>
            <div className={cx('column', 'column__sub')}>
                <div className={styles.info} onClick={() => handleToNote(note._id)}>
                    <NoteSolidIcon />
                    <div className={styles.name}>{note.title || 'Chưa có tiêu đề'}</div>
                </div>
            </div>
            <div className={styles.column}></div>
            <TimeUp updatedAt={note.updatedAt} className={styles.column} />
            <div className={styles.column}>Chỉ bạn</div>
            <div className={styles.column}>
                <TippyNoteMore />
            </div>
        </div>
    );
}

export default NoteRow;
