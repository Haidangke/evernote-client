import classNames from 'classnames/bind';
import { MdDelete } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotebookDfTitleIcon, NotebookTitleIcon, NoteTitleIcon } from 'components/Icons';
import { noteActions } from 'features/note/noteSlice';
import useLocationPage from 'hooks/useLocationPage';
import noteService from 'services/noteService';
import { Notebook } from 'types';

import styles from './Title.module.scss';
const cx = classNames.bind(styles);

interface TitleProps {
    notebook?: Notebook;
}

function Title({ notebook }: TitleProps) {
    const page = useLocationPage();
    const dispatch = useAppDispatch();
    const { listNote } = useAppSelector((state) => state.note);
    const amountNoteInTrash = listNote.filter((note) => note.isTrash).length;

    const handleEmptyTrash = () => {
        noteService.deleteMany().then(() => {
            const newListNotes = listNote.filter((note) => !note.isTrash);
            dispatch(noteActions.setListNote(newListNotes));
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title', { 'title-recycle': page === 'recycle' })}>
                {page === 'recycle' && (
                    <div className={cx('title-recycle__name')}>
                        <MdDelete size={22} className={cx('icon-note')} />
                        Thùng rác
                    </div>
                )}
                {['note', 'notes'].includes(page) && (
                    <>
                        <NoteTitleIcon className={cx('icon-note')} />
                        Ghi chú
                    </>
                )}
                {notebook && (
                    <>
                        {notebook.isDefault ? (
                            <NotebookDfTitleIcon className={cx('icon-book')} />
                        ) : (
                            <NotebookTitleIcon className={cx('icon-book')} />
                        )}
                        {notebook.name}
                    </>
                )}
                {page === 'recycle' && amountNoteInTrash > 0 && (
                    <div onClick={handleEmptyTrash} className={styles.clear}>
                        Dọn sạch thùng rác
                    </div>
                )}
            </div>
        </div>
    );
}

export default Title;
