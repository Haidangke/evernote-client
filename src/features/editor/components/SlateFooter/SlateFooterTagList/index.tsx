import { Note, Tag } from 'types';
import SlateFooterTagItem from './SlateFooterTagItem';

import styles from './SlateFooterTagList.module.scss';

interface SlateFooterTagListProps {
    note: Note<Tag>;
}

function SlateFooterTagNote({ note }: SlateFooterTagListProps) {
    return (
        <div className={styles.wrapper}>
            {note.tags.map((tag) => (
                <SlateFooterTagItem note={note} key={tag._id} tag={tag} />
            ))}
        </div>
    );
}

export default SlateFooterTagNote;
