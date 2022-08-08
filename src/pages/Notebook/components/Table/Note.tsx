import classNames from 'classnames/bind';

import TimeUp from 'layouts/DefaultLayout/NoteList/components/List/TimeUp';
import { NoteSolidIcon } from 'assets/icons';
import { TippyNoteMore } from 'components/Tippy';
import { Note, Tag } from 'types';
import useNavigateParams from 'hooks/useNavigateParams';

import styles from './Table.module.scss';

type NoteProps = {
    note: Note<Tag>;
};

const cx = classNames.bind(styles);
function NoteRow({ note }: NoteProps) {
    const handleToNote = useNavigateParams();
    return (
        <div key={note._id} className={styles.row}>
            <div className={cx('column', 'column__sub')}>
                <div className={styles.info} onClick={() => handleToNote({ n: note._id }, '/note')}>
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
