import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import SearchInput from 'components/Input/SearchInput';
import ModalCreate from 'components/Modal/ModalCreate';
import { ModalProps } from '.';

import styles from './NoteMore.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import noteService from 'services/noteService';
import { toastError, toastInfo } from 'components/Toast/toast';
const cx = classNames.bind(styles);

interface ChangeTagProps extends ModalProps {}

function ChangeTag({ isOpen, setIsOpen, note }: ChangeTagProps) {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const tags = useAppSelector((state) => state.tag.listTag);
    const tagsOfNote = note.tags;

    const [checkTags, setCheckTags] = useState(() =>
        tags.map((tag) => ({
            _id: tag._id,
            name: tag.name,
            isCheck: tagsOfNote.some((tagOfNote) => tagOfNote._id === tag._id),
        }))
    );

    const handleChangeChecked = (_id: string) => {
        setCheckTags((prev) => {
            return prev.map((item) => {
                if (item._id === _id) {
                    return { ...item, isCheck: !item.isCheck };
                } else {
                    return item;
                }
            });
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await noteService.update(note._id, {
                tags: checkTags.filter((tag) => tag.isCheck).map((tag) => tag._id),
            });
            dispatch(noteActions.updateNote(response));
            toastInfo(`Đã sửa thẻ cho "${note.title || 'Chưa có tiêu đề'}"`);
        } catch (error) {
            toastError('Sửa thẻ thất bại do gặp lỗi');
        }
    };

    return (
        <ModalCreate
            onSubmit={handleSubmit}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='Sửa thẻ'
            action='Xong'
            width='600px'
            description='Chọn những thẻ sẽ được thêm vào hoặc xóa khỏi ghi chú'
            // disabled={notebook?._id === selectMove?._id}
        >
            <div className={cx('modal', 'modal--tag')}>
                <div className={styles.searchInput}>
                    <SearchInput
                        value={search}
                        setValue={setSearch}
                        placeholder='Tìm thẻ hoặc nhập tên cho thẻ mới'
                    />
                </div>
                Check
                {checkTags.map((tag) => (
                    <div key={tag._id}>
                        <input
                            type='checkbox'
                            checked={tag.isCheck}
                            onChange={() => handleChangeChecked(tag._id)}
                        />
                        <div>{tag.name}</div>
                    </div>
                ))}
            </div>
        </ModalCreate>
    );
}

export default ChangeTag;
