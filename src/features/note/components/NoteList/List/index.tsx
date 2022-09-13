import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAppSelector } from 'app/hooks';
import { Sort } from 'config/actions';
import TimeUp from 'components/TimeUp';
import Create from '../Create';

import styles from './List.module.scss';
const cx = classNames.bind(styles);

interface ListProps {
    sort: Sort;
}

function List({ sort }: ListProps) {
    const { listNote, isFetching, isFetchSuccess } = useAppSelector((state) => state.note);
    const [searchParams, setSearchParams] = useSearchParams();

    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b') as string;
    if (
        listNote
            .filter((note) => !note.isTrash)
            .filter((note) => (notebookId ? note.notebook === notebookId : note)).length === 0 &&
        isFetchSuccess
    )
        return <Create notebookId={notebookId} />;
    return !isFetching ? (
        <>
            <div className={cx('header')}>
                <div className={cx('column-header')}>Tiêu đề</div>
                <div className={cx('column-header')}>Đã cập nhật</div>
                <div className={cx('column-header')}>Thẻ</div>
            </div>
            {[...listNote]
                .filter((note) => note.isTrash === false)
                .filter((note) => (notebookId ? note.notebook === notebookId : note))
                .sort((x, y) => {
                    if (sort === 'title') return x.title.localeCompare(y.title);
                    return new Date(y[sort]).getTime() - new Date(x[sort]).getTime();
                })
                .map((note, index) => (
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
                        <TimeUp updatedAt={note.updatedAt} />
                        <div className={cx('column')}></div>
                    </div>
                ))}
        </>
    ) : (
        <></>
    );
}

export default memo(List);
