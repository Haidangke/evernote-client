import classNames from 'classnames/bind';

import { NoteSolidIcon } from 'assets/icons';

import { Note, Tag } from 'types';
import useNavigateParams from 'hooks/useNavigateParams';

import NoteMore from 'features/note/components/NoteMore';
import TimeUp from 'components/TimeUp';

import styles from './NotebookTable.module.scss';
const cx = classNames.bind(styles);

interface NoteItemProps {
    note: Note<Tag>;
}

function NoteItem({ note }: NoteItemProps) {
    const navigate = useNavigateParams();
    return (
        <div key={note._id} className={styles.row}>
            <div className={cx('column', 'column__sub')}>
                <div className={styles.info} onClick={() => navigate('/note', { n: note._id })}>
                    <NoteSolidIcon />
                    <div className={styles.name}>{note.title || 'Chưa có tiêu đề'}</div>
                </div>
            </div>
            <div className={styles.column}></div>
            <TimeUp updatedAt={note.updatedAt} className={styles.column} />
            <div className={styles.column}>Chỉ bạn</div>
            <div className={styles.column}>
                <NoteMore />
            </div>
        </div>
    );
}

export default NoteItem;
