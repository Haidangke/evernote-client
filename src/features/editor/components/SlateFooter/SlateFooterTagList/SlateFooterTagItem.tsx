import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useAppDispatch } from 'app/hooks';
import { ArrowDownIcon } from 'assets/icons';
import ModalCreate from 'components/Modal/ModalCreate';
import { TippyHeadLess } from 'components/Tippy/';
import Toast from 'components/Toast';
import { noteActions } from 'features/note/noteSlice';
import { tagActions } from 'features/tag/tagSlice';
import noteService from 'services/noteService';
import tagService from 'services/tagService';
import { Note, Tag } from 'types';

import styles from './SlateFooterTagList.module.scss';
import useOnClickOutside from 'hooks/useOnclickOutside';
const cx = classNames.bind(styles);

interface SlateFooterTagItemProps {
    tag: Tag;
    note: Note<Tag>;
}

function SlateFooterTagItem({ tag, note }: SlateFooterTagItemProps) {
    const dispatch = useAppDispatch();
    const [isFocus, setIsFocus] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const [visible, setVisible] = useState(false);
    const itemRef = useRef(null);
    const close = () => setVisible(false);

    const handleRemoveTag = () => {
        noteService
            .update(note._id, {
                tags: [...note.tags.map((t) => t._id).filter((t) => t !== tag._id)],
            })
            .then((data) => {
                dispatch(noteActions.updateNote(data));
            });
    };

    const handleDeleteTag = () => {
        setIsModal(false);
        tagService
            .delete(tag._id)
            .then((data) => {
                dispatch(noteActions.setListNote(data.listNote));
                dispatch(tagActions.setListTag(data.listTag));
                toast((t) => (
                    <Toast toastId={t.id}>
                        <>
                            <span>Đã xóa thẻ "</span>
                            <span className={styles.value}> {tag.name} </span>
                            <span>" khỏi tất cả ghi chú </span>
                        </>
                    </Toast>
                ));
            })
            .catch(() => {});
    };

    useOnClickOutside(itemRef, (event: any) => {
        const element = event.target;

        if (
            typeof element.parentElement.className === 'string' &&
            element.parentElement.className.includes(styles.dropdown) &&
            element.classList.contains('tippy__dropdown-item')
        )
            return;
        setIsFocus(false);
        setVisible(false);
    });

    return (
        <>
            <TippyHeadLess
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
                        <div
                            onClick={() => {
                                setIsModal(true);
                                close();
                            }}
                            className='tippy__dropdown-item'
                        >
                            Xóa thẻ khỏi tất cả ghi chú
                        </div>
                        <div className='tippy__dropdown-item'>Thêm vào lối tắt</div>
                    </div>
                }
            >
                <div
                    ref={itemRef}
                    onClick={() => setIsFocus(true)}
                    className={cx('item', { item__active: isFocus })}
                >
                    <span className={styles.itemName}>{tag.name}</span>
                    <span className={styles.itemIcon}>
                        <ArrowDownIcon />
                    </span>
                </div>
            </TippyHeadLess>
            <ModalCreate
                onSubmit={handleDeleteTag}
                isOpen={isModal}
                setIsOpen={setIsModal}
                title='Xóa thẻ'
                description={`Bạn có chắc bạn muốn xóa thẻ ${tag.name} khỏi 1 ghi chú không?`}
                variant='danger'
                action='Có, hãy xóa thẻ'
            />
            <Toaster />
        </>
    );
}

export default SlateFooterTagItem;
