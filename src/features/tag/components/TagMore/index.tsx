import { memo, useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import TippyMore from 'components/Tippy/TippyMore';
import Toast from 'components/Toast';
import tagService from 'services/tagService';
import { Tag } from 'types';
import { tagActions } from 'features/tag/tagSlice';

import styles from './TagMore.module.scss';

interface TagMoreProps {
    tag: Tag;
}

function TagMore({ tag }: TagMoreProps) {
    const dispatch = useAppDispatch();
    const [isMore, setIsMore] = useState(false);

    const handleRemoveTag = () => {
        setIsMore(false);
        if (!tag) return;
        tagService.remove(tag._id).then((data) => {
            dispatch(noteActions.setListNote(data.listNote));
            toast((t) => (
                <Toast toastId={t.id}>
                    <>
                        <span>Đã xóa thẻ "</span>
                        <span className={styles.value}> {tag.name} </span>
                        <span>" khỏi tất cả ghi chú </span>
                    </>
                </Toast>
            ));
        });
    };

    const handleDeleteTag = () => {
        setIsMore(false);
        if (!tag) return;
        tagService.delete(tag._id).then((data) => {
            dispatch(tagActions.setListTag(data.listTag));
            dispatch(noteActions.setListNote(data.listNote));
            toast((t) => (
                <Toast toastId={t.id}>
                    <>
                        <span>Đã xóa thẻ "</span>
                        <span className={styles.value}> {tag.name} </span>
                        <span>" khỏi tất cả ghi chú </span>
                    </>
                </Toast>
            ));
        });
    };

    return (
        <>
            <TippyMore
                className={styles.popper}
                isMore={isMore}
                setIsMore={setIsMore}
                dropdown={
                    <div className={styles.wrapper}>
                        <div onClick={handleDeleteTag} className={styles.item}>
                            Xóa thẻ...
                        </div>
                        <div onClick={handleRemoveTag} className={styles.item}>
                            Xóa thẻ khỏi tất cả ghi chú
                        </div>
                    </div>
                }
            />
        </>
    );
}

export default memo(TagMore);
