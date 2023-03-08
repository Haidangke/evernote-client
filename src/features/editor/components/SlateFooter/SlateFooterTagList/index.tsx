import classNames from 'classnames/bind';
import { Fragment, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from 'app/hooks';
import { ArrowDownIcon } from 'components/Icons';
import ModalCreate from 'components/Modal/ModalCreate';
import { TippyHeadLess } from 'components/Tippy/';
import Toast from 'components/Toast';
import { noteActions } from 'features/note/noteSlice';
import noteService from 'services/noteService';
import tagService from 'services/tagService';
import { Note, Tag } from 'types';
import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './SlateFooterTagList.module.scss';
const cx = classNames.bind(styles);

interface SlateFooterTagListProps {
    note: Note<Tag>;
}

function SlateFooterTagList({ note }: SlateFooterTagListProps) {
    const dispatch = useAppDispatch();
    const [isFocus, setIsFocus] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const [visible, setVisible] = useState(false);
    const itemRef = useRef(null);
    const close = () => setVisible(false);

    const handleRemoveTag = async (tag: Tag) => {
        try {
            const data = await noteService.update(note._id, {
                tags: [...note.tags.map((t) => t._id).filter((t) => t !== tag._id)],
            });

            dispatch(noteActions.updateNote(data));
        } catch (error) {}
    };

    const handleDeleteTag = async (tag: Tag) => {
        setIsModal(false);
        console.log({ tag });
        try {
            const data = await tagService.remove(tag._id);

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
        } catch (error) {}
    };

    const handleFilterWithTag = (tag: Tag) => {
        dispatch(
            noteActions.setFilter({
                tags: [tag._id],
                notebook: null,
                createdAt: null,
                updatedAt: null,
            })
        );
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
        <div className={styles.wrapper}>
            {note.tags.map((tag) => (
                <Fragment key={tag._id}>
                    <TippyHeadLess
                        visible={visible}
                        setVisible={setVisible}
                        placement='top-start'
                        className='tippy__dropdown-wrapper'
                        dropdown={
                            <div className={classNames('tippy__dropdown', styles.dropdown)}>
                                <div
                                    onClick={() => handleFilterWithTag(tag)}
                                    className='tippy__dropdown-item'
                                >
                                    Lọc theo thẻ
                                </div>
                                <div
                                    onClick={() => handleRemoveTag(tag)}
                                    className='tippy__dropdown-item'
                                >
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
                        onSubmit={() => handleDeleteTag(tag)}
                        isOpen={isModal}
                        setIsOpen={setIsModal}
                        title='Xóa thẻ'
                        description={`Bạn có chắc bạn muốn xóa thẻ ${tag.name} khỏi 1 ghi chú không?`}
                        variant='danger'
                        action='Có, hãy xóa thẻ'
                    />
                </Fragment>
            ))}
        </div>
    );
}

export default SlateFooterTagList;
