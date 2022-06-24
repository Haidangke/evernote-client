import { useAppSelector } from 'app/hooks';
import { ArrowLeftIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import Element from '../Element';
import Tab from '../Tab';
import styles from './NoteList.module.scss';
import NoteListLoading from './NoteListLoading';

function NoteList() {
    const navigate = useNavigate();
    const { listNote } = useAppSelector((state) => state.listNote);

    const handleToNote = (_id: string) => {
        navigate({
            pathname: '/note',
            search: '?noteId=' + _id,
        });
    };

    return (
        <Element
            title={
                <>
                    <span>Ghi chú</span>
                    <ArrowLeftIcon width={14} height={14} />
                </>
            }
        >
            <Tab />
            <div className={styles.wrapper}>
                {true ? (
                    <NoteListLoading />
                ) : (
                    listNote.map((note) => (
                        <div
                            onClick={() => handleToNote(note._id)}
                            key={note._id}
                            className={styles.item}
                        >
                            <div className={styles.body}>
                                <div className={styles.title}>
                                    {note.title || 'Chưa có tiêu đề'}
                                </div>
                                <div className={styles.content}>Đây là nội dung của ghi chú</div>
                            </div>
                            <div className={styles.time}>1 phút trước</div>
                        </div>
                    ))
                )}
            </div>
        </Element>
    );
}

export default NoteList;
