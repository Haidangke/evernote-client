import { useState } from 'react';
import classNames from 'classnames';
import noteService from 'services/noteService';

import { noteActions } from 'features/note/noteSlice';
import { useAppDispatch } from 'app/hooks';
import { TippyHeadless } from 'components/Tippy/';
import { Note, Tag } from 'types';
import { ArrowDownIcon } from 'assets/icons';

import styles from './SlateFooterTagList.module.scss';

interface SlateFooterTagListProps {
    note?: Note<Tag>;
}

interface SlateFooterTagItemProps {
    tag: Tag;
    note: Note<Tag>;
}

function SlateFooterTagItem({ tag, note }: SlateFooterTagItemProps) {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const handleRemoveTag = () => {
        noteService
            .update(note._id, {
                tags: [...note.tags.map((t) => t._id).filter((t) => t !== tag._id)],
            })
            .then((data) => {
                dispatch(noteActions.updateNote(data));
            });
    };
    return (
        <TippyHeadless
            visible={visible}
            setVisible={setVisible}
            placement='top-start'
            className='tippy__dropdown-wrapper'
            dropdown={
                <div className={classNames('tippy__dropdown', styles.dropdown)}>
                    <div className='tippy__dropdown-item'>Lọc theo thẻ</div>
                    <div onClick={handleRemoveTag} className='tippy__dropdown-item'>
                        Loại bỏ thẻ
                    </div>
                    <div className='tippy__dropdown-item'>Xóa thẻ khỏi tất cả ghi chú</div>
                    <div className='tippy__dropdown-item'>Thêm vào lối tắt</div>
                </div>
            }
        >
            <div onClick={() => setVisible(!visible)} className={styles.item}>
                <span>{tag.name}</span>
                <ArrowDownIcon />
            </div>
        </TippyHeadless>
    );
}

function SlateFooterTagNote({ note }: SlateFooterTagListProps) {
    if (!note || note?.tags.length === 0) return <></>;

    return (
        <div className={styles.wrapper}>
            {note.tags.map((tag) => (
                <SlateFooterTagItem note={note} key={tag._id} tag={tag} />
            ))}
        </div>
    );
}

export default SlateFooterTagNote;
