import classNames from 'classnames/bind';
import {  useMemo, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotebookDfIcon, NotebookIcon } from 'components/Icons';
import TimeUp from 'components/TimeUp';
import useNavigateParams from 'hooks/useNavigateParams';
import { Note, Notebook, Tag } from 'types';
import NotebookMore from '../NotebookMore';
import NoteItem from './NoteItem';
import { noteActions } from 'features/note/noteSlice';

import styles from './NotebookTable.module.scss';
const cx = classNames.bind(styles);

interface NotebookTableItemProps {
    notebook: Notebook;
}

function NotebookTableItem({ notebook }: NotebookTableItemProps) {
    console.log('re-render');
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { listNote } = useAppSelector((state) => state.note);
    const navigate = useNavigateParams();
    const notesOfNotebook = useMemo(
        () =>
            listNote
                .filter((note) => !note.isTrash)
                .filter((note) => note.notebook === notebook._id),
        [listNote, notebook._id]
    );

    const handleDrop = (e: any) => {
        e.preventDefault();
        const noteDrag = JSON.parse(e.dataTransfer.getData('note'));
        const notebookDrag = JSON.parse(e.dataTransfer.getData('notebook'));

        if (notebookDrag !== notebook._id) {
            dispatch(noteActions.updateNote({ ...noteDrag, notebook: notebook._id }));
        }
    };

    const handleDragStart = (e: any, note: Note<Tag>) => {
        e.dataTransfer.setData('note', JSON.stringify(note));
        e.dataTransfer.setData('notebook', JSON.stringify(note.notebook));
    };

    const handleDragEnter = (e: any) => {};

    return (
        <>
            <div
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={styles.row}
            >
                <div className={styles.column}>
                    <IoMdArrowDropright
                        onClick={() => setIsOpen(!isOpen)}
                        className={cx('arrow', {
                            arrow__open: isOpen,
                        })}
                    />
                    <div
                        className={styles.info}
                        onClick={() => navigate('/notebook', { b: notebook._id, an: true })}
                    >
                        {notebook.isDefault ? (
                            <NotebookDfIcon width={24} height={24} />
                        ) : (
                            <NotebookIcon />
                        )}
                        <div className={styles.name}>{notebook.name}</div>
                        <span className={styles.amount}>({notesOfNotebook.length})</span>
                    </div>
                </div>
                <div className={cx('column', 'column__creator')}>{notebook.creator}</div>
                <TimeUp updatedAt={notebook.updatedAt} className={styles.column} />
                <div className={styles.column}>
                    <BsDash />
                </div>
                <div className={styles.column}>
                    <NotebookMore notebook={notebook} />
                </div>
            </div>

            {isOpen &&
                notesOfNotebook.map((note) => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        handleDragStart={(e: any) => handleDragStart(e, note)}
                    />
                ))}
        </>
    );
}

export default NotebookTableItem;
