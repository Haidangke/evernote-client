import classNames from 'classnames/bind';

import { NoteSolidIcon } from 'components/Icons';
import useNavigateParams from 'hooks/useNavigateParams';
import { Note, Tag } from 'types';
import styles from './Search.module.scss';

interface ListSearchProps {
    notes: Note<Tag>[];
    match: string;
}

const cx = classNames.bind(styles);

function ListSearch({ notes, match }: ListSearchProps) {
    const navigate = useNavigateParams();
    const handleNavigateNote = (_id: string) => {
        navigate('note', { n: _id });
    };

    return notes.length > 0 ? (
        <div className={cx('search')}>
            <div className={cx('search-title')}>Khớp với {match}</div>
            <div className={cx('search-list')}>
                {notes.map((note) => (
                    <div
                        onClick={() => handleNavigateNote(note._id)}
                        key={note._id}
                        className={cx('search-item')}
                    >
                        <NoteSolidIcon className='search-icon' />
                        <div className={cx('search-name')}>{note.title || 'Chưa có tiêu đề'}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
}

export default ListSearch;
