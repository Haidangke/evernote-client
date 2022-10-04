import { useEffect, useRef, useState } from 'react';
import classNamesBind from 'classnames/bind';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

import noteService from 'services/noteService';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { charMatchString } from 'utils/StringUtils';
import { noteActions } from 'features/note/noteSlice';
import { TippyButton, TippyHeadless } from 'components/Tippy';
import { AddTagIcon } from 'assets/icons';
import { Note, Tag } from 'types';

import styles from './SlateFooterTagAdd.module.scss';
const cx = classNamesBind.bind(styles);

interface SlateFooterAddTagProps {
    note?: Note<Tag>;
}

function SlateFooterAddTag({ note }: SlateFooterAddTagProps) {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState<boolean>(false);
    const [valueTag, setValueTag] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const { listTag } = useAppSelector((state) => state.tag);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleAddTag = (tag: Tag) => {
        if (!note) return;
        noteService
            .update(note._id, { tags: [...note.tags.map((tag) => tag._id), tag._id] })
            .then((data) => {
                dispatch(noteActions.updateNote(data));
                setValueTag('');
            });
    };

    const handleCreateTag = (nameTag: string) => {};

    useEffect(() => {
        if (isFocus) {
            setVisible(true);
            inputRef.current?.querySelector('input')?.focus();
        } else {
            setVisible(false);
        }
    }, [isFocus]);

    if (!note) return <></>;

    return (
        <>
            <TippyButton
                onClick={() => setIsFocus(true)}
                className={styles.btn}
                content='Thêm thẻ'
                placement='top'
            >
                <div className={styles.icon}>
                    <AddTagIcon />
                </div>
            </TippyButton>
            <TippyHeadless
                visible={visible && Boolean(valueTag)}
                setVisible={setVisible}
                placement='top-start'
                className={cx('tippy')}
                dropdown={
                    <div className={classNames('tippy__dropdown', styles.dropdown)}>
                        <div className={cx('dropdown-header')}>
                            <div
                                onClick={() => handleCreateTag(valueTag)}
                                className={cx('dropdown-name')}
                            >
                                <AddTagIcon />
                                Tạo thẻ <span>"{valueTag}"</span>
                            </div>
                            <div className={cx('dropdown-tab')}>Tab</div>
                        </div>

                        <>
                            {listTag
                                .filter((tag) => !note.tags.map((t) => t._id).includes(tag._id))
                                .filter((tag) =>
                                    tag.name.toLowerCase().includes(valueTag.trim().toLowerCase())
                                )
                                .map((tag) => {
                                    const result = charMatchString(tag.name, valueTag);

                                    return (
                                        <div
                                            onClick={() => handleAddTag(tag)}
                                            key={tag._id}
                                            className='tippy__dropdown-item'
                                        >
                                            <span style={{ fontWeight: 600 }}>{result.match}</span>
                                            {result.noMatch}
                                        </div>
                                    );
                                })}
                        </>
                    </div>
                }
            >
                <div ref={inputRef} className={styles.input__wrapper}>
                    <AutosizeInput
                        autoComplete='off'
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => {
                            setIsFocus(false);
                        }}
                        className={cx('input', {
                            input__focus: isFocus,
                            input__blur: !isFocus && valueTag,
                            input__hide: !isFocus && note.tags.length > 0 && !valueTag,
                        })}
                        value={valueTag}
                        onChange={(e) => setValueTag(e.target.value.toLowerCase())}
                        placeholder={isFocus ? 'Nhập để thêm...' : 'Thêm thẻ'}
                    />
                </div>
            </TippyHeadless>
        </>
    );
}
export default SlateFooterAddTag;
