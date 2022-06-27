import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAppSelector } from 'app/hooks';
import TimeUp from './TimeUp';
import styles from './List.module.scss';
import { ActionsType } from 'config/actions';
const cx = classNames.bind(styles);

interface ListProps {
    actions: ActionsType;
}

function List({ actions }: ListProps) {
    const { listNote } = useAppSelector((state) => state.note);
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('noteId');

    if (listNote.length === 0) return <></>;
    return (
        <div className={cx('wrapper')}>
            {[...listNote]
                .sort((x, y) => {
                    if (actions.sort === 'title') return x.title.localeCompare(y.title);
                    return (
                        new Date(y[actions.sort]).getTime() - new Date(x[actions.sort]).getTime()
                    );
                })
                .map((note, index) => (
                    <div
                        key={note._id}
                        onClick={() => {
                            searchParams.set('noteId', note._id);
                            setSearchParams(searchParams);
                        }}
                        className={cx('row', {
                            row__hl: index % 2 === 0,
                            row__active: noteId === note._id,
                        })}
                    >
                        <div className={cx('column')}>{note.title || 'Chưa có tiêu đề'}</div>
                        <TimeUp updatedAt={note.updatedAt} />
                        <div className={cx('column')}></div>
                    </div>
                ))}
        </div>
    );
}

export default memo(List);
