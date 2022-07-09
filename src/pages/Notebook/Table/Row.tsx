import { useMemo, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import { IoIosMore, IoMdArrowDropright } from 'react-icons/io';

import { NotebookIcon, NoteSolidIcon } from 'assets/icons';
import styles from './Table.module.scss';
import classNames from 'classnames/bind';
import { Notebook } from 'types';
import TimeUp from 'pages/Note/NoteList/components/List/TimeUp';
import { useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';

interface RowProps {
    notebook: Notebook;
    isHightlight: boolean;
}

const cx = classNames.bind(styles);
function Row({ notebook, isHightlight }: RowProps) {
    const navigate = useNavigate();
    const { listNote } = useAppSelector((state) => state.note);

    const notesOfNotebook = useMemo(
        () => listNote.filter((note) => note.notebook === notebook._id),
        [listNote, notebook._id]
    );

    const [isOpen, setIsOpen] = useState(false);

    const handleToNote = (_id: string) => {
        navigate({
            pathname: '/note',
            search: '?noteId=' + _id,
        });
    };
    return (
        <>
            <div
                className={cx('row', { row__hightlight: isHightlight })}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.column}>
                    <IoMdArrowDropright
                        className={cx('arrow', {
                            arrow__open: isOpen,
                        })}
                    />
                    <NotebookIcon />
                    <div className={styles.name}>{notebook.name}</div>
                    <span>({notesOfNotebook.length})</span>
                </div>
                <div className={styles.column}>{notebook.creator}</div>
                <TimeUp updatedAt={notebook.updatedAt} className={styles.column} />
                <div className={styles.column}>
                    <BsDash />
                </div>
                <div className={styles.column}>
                    <IoIosMore />
                </div>
            </div>
            {isOpen &&
                notesOfNotebook.map((note) => (
                    <div
                        key={note._id}
                        className={styles.row}
                        onClick={() => handleToNote(note._id)}
                    >
                        <div className={cx('column', 'column__sub')}>
                            <NoteSolidIcon className={styles.note} />
                            <div className={styles.name}>{note.title || 'Chưa có tiêu đề'}</div>
                        </div>
                        <div className={styles.column}></div>
                        <TimeUp updatedAt={note.updatedAt} className={styles.column} />
                        <div className={styles.column}>Chỉ bạn</div>
                        <div className={styles.column}>
                            <IoIosMore />
                        </div>
                    </div>
                ))}
        </>
    );
}

export default Row;
