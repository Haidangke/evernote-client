import { useMemo, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { IoMdArrowDropright } from 'react-icons/io';

import { NotebookDfIcon, NotebookIcon } from 'assets/icons';
import { Notebook } from 'types';
import TimeUp from 'components/TimeUp';
import { useAppSelector } from 'app/hooks';
import More from 'components/Tippy/TippyMore/TippyNotebookMore';
import NoteItem from './NoteItem';

import styles from './Table.module.scss';
import useNavigateParams from 'hooks/useNavigateParams';
const cx = classNames.bind(styles);

interface NotebookItemProps {
    notebook: Notebook;
}

function NotebookItem({ notebook }: NotebookItemProps) {
    const { listNote } = useAppSelector((state) => state.note);
    const navigate = useNavigateParams();
    const notesOfNotebook = useMemo(
        () => listNote.filter((note) => note.notebook === notebook._id),
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
                    <More notebook={notebook} />
                </div>
            </div>
            {isOpen && notesOfNotebook.map((note) => <NoteItem note={note} key={note._id} />)}
        </>
    );
}

export default NotebookItem;
