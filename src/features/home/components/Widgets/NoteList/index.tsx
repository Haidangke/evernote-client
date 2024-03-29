import { Fragment } from 'react';
import classNames from 'classnames/bind';

import TimeUp from 'components/TimeUp';
import { useAppSelector } from 'app/hooks';
import useAddNote from 'hooks/useAddNote';
import { ArrowLeftIcon, NewNoteIcon } from 'components/Icons';
import Element from '../../Element';
import Tab from '../../Tab';
import NoteListLoading from './NoteListLoading';

import useNavigateParams from 'hooks/useNavigateParams';

import styles from './NoteList.module.scss';
const cx = classNames.bind(styles);

function NoteList() {
    const { listNote, isFetching, isFetchSuccess } = useAppSelector((state) => state.note);
    const listNoteFilter = listNote
        .filter((note) => !note.isTrash)
        .map((note) => ({ ...note, content: JSON.parse(note.content) }));

    const navigate = useNavigateParams();

    const addNote = useAddNote();

    return (
        <Element
            menu={[
                { title: 'Chuyển đến ghi chú', handle: () => navigate('/note') },
                { title: 'Tạo ghi chú mới', handle: addNote },
                { title: 'Xóa tiện ích', handle: () => {} },
            ]}
            title={
                <Fragment>
                    <span>Ghi chú</span>
                    <ArrowLeftIcon width={14} height={14} />
                </Fragment>
            }
        >
            <Tab />
            <div className={styles.wrapper}>
                {isFetching ? (
                    <NoteListLoading />
                ) : listNoteFilter.length ? (
                    listNoteFilter.map((note) => {
                        return (
                            <div
                                onClick={() => navigate('/note', { n: note._id })}
                                key={note._id}
                                className={styles.item}
                            >
                                <div className={styles.body}>
                                    <div className={styles.title}>
                                        {note.title || 'Chưa có tiêu đề'}
                                    </div>
                                    <div className={styles.content}>
                                        {/* {content || 'Chưa có nội dung'} */}
                                    </div>
                                </div>
                                <TimeUp className={styles.time} updatedAt={note.updatedAt} />
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
                {isFetchSuccess && !listNoteFilter.length && (
                    <div onClick={addNote} className={cx('item', 'item__new')}>
                        <NewNoteIcon />
                        <h4>Tạo ghi chú mới</h4>
                    </div>
                )}
            </div>
        </Element>
    );
}

export default NoteList;
