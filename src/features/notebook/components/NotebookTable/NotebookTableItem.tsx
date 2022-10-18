import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';

import { useAppSelector } from 'app/hooks';
import { NotebookDfIcon, NotebookIcon } from 'assets/icons';
import TimeUp from 'components/TimeUp';
import useNavigateParams from 'hooks/useNavigateParams';
import { Notebook } from 'types';
import NotebookMore from '../NotebookMore';
import NoteItem from './NoteItem';

import styles from './NotebookTable.module.scss';
const cx = classNames.bind(styles);

interface NotebookTableItemProps {
    notebook: Notebook;
}

function NotebookTableItem({ notebook }: NotebookTableItemProps) {
    const { listNote } = useAppSelector((state) => state.note);
    const navigate = useNavigateParams();
    const notesOfNotebook = useMemo(
        () =>
            listNote
                .filter((note) => !note.isTrash)
                .filter((note) => note.notebook === notebook._id),
        [listNote, notebook._id]
    );

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={styles.row}>
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
                <div className={styles.column}>{notebook.creator}</div>
                <TimeUp updatedAt={notebook.updatedAt} className={styles.column} />
                <div className={styles.column}>
                    <BsDash />
                </div>
                <div className={styles.column}>
                    <NotebookMore notebook={notebook} />
                </div>
            </div>
            {isOpen && notesOfNotebook.map((note) => <NoteItem note={note} key={note._id} />)}
        </>
    );
}

export default NotebookTableItem;
