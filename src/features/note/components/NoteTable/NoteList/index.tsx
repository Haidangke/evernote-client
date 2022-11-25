import classNames from 'classnames/bind';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import TimeUp from 'components/TimeUp';
import useLocationPage from 'hooks/useLocationPage';
import { Note, Tag } from 'types';
import { EmptyTrash, EmptyCreate, EmptyFilter } from './NoteListEmpty';

import styles from './NoteList.module.scss';
const cx = classNames.bind(styles);

interface NoteListProps {
    listNote: Note<Tag>[];
    isFilter: boolean;
}

function NoteList({ listNote, isFilter }: NoteListProps) {
    const page = useLocationPage();
    const { isFetchSuccess } = useAppSelector((state) => state.note);
    const [searchParams, setSearchParams] = useSearchParams();

    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b') as string;

    if (!isFetchSuccess) return <></>;

    if (listNote.length === 0 && isFetchSuccess) {
        if (page === 'recycle') {
            return <EmptyTrash />;
        } else {
            return isFilter ? <EmptyFilter /> : <EmptyCreate notebookId={notebookId} />;
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={cx('header')}>
                <div className={cx('column-header')}>Tiêu đề</div>
                <div className={cx('column-header')}>Đã cập nhật</div>
                <div className={cx('column-header')}>Thẻ</div>
            </div>

            {listNote.map((note, index) => (
                <div
                    key={note._id}
                    onClick={() => {
                        searchParams.set('n', note._id);
                        setSearchParams(searchParams);
                    }}
                    className={cx('row', {
                        row__hl: index % 2 === 0,
                        row__active: noteId === note._id,
                    })}
                >
                    <div className={cx('column')}>{note.title || 'Chưa có tiêu đề'}</div>
                    <TimeUp className={cx('column')} updatedAt={note.updatedAt} />
                    <div className={cx('column')}>
                        {note.tags.map((tag) => tag.name).join(', ')}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(NoteList);
