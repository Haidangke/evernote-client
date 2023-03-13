import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import FooterAddTag from '../FooterAdd';
import FooterTagList from '../FooterList';

import styles from './FooterTag.module.scss';

function FooterTag() {
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n');

    const { listNote } = useAppSelector((state) => state.note);

    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);

    return (
        <div className={styles.wrapper}>
            {note && (
                <>
                    <FooterTagList note={note} />
                    <FooterAddTag note={note} />
                </>
            )}
        </div>
    );
}

export default FooterTag;
