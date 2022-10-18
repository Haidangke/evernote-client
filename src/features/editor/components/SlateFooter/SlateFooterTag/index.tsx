import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import SlateFooterAddTag from '../SlateFooterTagAdd';
import SlateFooterTagList from '../SlateFooterTagList';

import styles from './SlateFooterTag.module.scss';

function SlateFooterTag() {
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n');

    const { listNote } = useAppSelector((state) => state.note);

    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    return (
        <div className={styles.wrapper}>
            {note && (
                <>
                    <SlateFooterTagList note={note} />
                    <SlateFooterAddTag note={note} />
                </>
            )}
        </div>
    );
}

export default SlateFooterTag;
