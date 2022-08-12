import { Fragment } from 'react';
import classNames from 'classnames/bind';

import { useAppSelector } from 'app/hooks';
import useAddNote from 'hooks/useAddNote';
import { AddNoteIcon, ArrowLeftIcon, NewNoteIcon } from 'assets/icons';
import Element from '../../Element';
import Tab from '../../Tab';
import NoteListLoading from './NoteListLoading';
import TimeUp from 'layouts/DefaultLayout/NoteList/components/List/TimeUp';
import useNavigateParams from 'hooks/useNavigateParams';

import styles from './NoteList.module.scss';
const cx = classNames.bind(styles);

function NoteList() {
    const { listNote } = useAppSelector((state) => state.note);

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
                {listNote.length === 0 ? (
                    <NoteListLoading />
                ) : (
                    listNote.map((note) => (
                        <div
                            onClick={() => navigate('/note', { n: note._id })}
                            key={note._id}
                            className={styles.item}
                        >
                            <div className={styles.body}>
                                <div className={styles.title}>
                                    {note.title || 'Chưa có tiêu đề'}
                                </div>
                                <div className={styles.content}>Đây là nội dung của ghi chú</div>
                            </div>
                            <TimeUp className={styles.time} updatedAt={note.updatedAt} />
                        </div>
                    ))
                )}
                {listNote.length !== 0 && (
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
