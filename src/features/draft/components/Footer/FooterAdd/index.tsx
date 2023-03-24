import classNames from 'classnames';
import classNamesBind from 'classnames/bind';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddTagSolidIcon } from 'components/Icons';
import { TippyButton, TippyHeadLess } from 'components/Tippy';
import { noteActions } from 'features/note/noteSlice';
import { tagActions } from 'features/tag/tagSlice';
import noteService from 'services/noteService';
import tagService from 'services/tagService';
import { Note, Tag } from 'types';
import { charMatchString } from 'utils/StringUtils';

import styles from './FooterTagAdd.module.scss';
const cx = classNamesBind.bind(styles);

interface FooterAddTagProps {
    note: Note<Tag>;
}

function FooterAddTag({ note }: FooterAddTagProps) {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState<boolean>(false);
    const [inputTag, setInputTag] = useState('');
    const inputRef = useRef<HTMLDivElement>(null);

    const { listTag } = useAppSelector((state) => state.tag);
    const tagOfNote = note.tags;

    const isExistsTag = useMemo(
        () => !!listTag.find((tag) => tag.name === inputTag),
        [inputTag, listTag]
    );

    const matchTag = useMemo(
        () =>
            listTag
                .filter((tag) => !tagOfNote.map((t) => t._id).includes(tag._id))
                .filter((tag) => tag.name.toLowerCase().includes(inputTag.toLowerCase())),
        [inputTag, listTag, tagOfNote]
    );

    const handleAddTag = (tag: Tag) => {
        if (!note) return;
        noteService
            .update(note._id, { tags: [...tagOfNote.map((tag) => tag._id), tag._id] })
            .then((data) => {
                setInputTag('');
                dispatch(noteActions.updateNote(data));
            });
    };

    const handleCreateTag = () => {
        if (!note) return;
        tagService
            .create(inputTag.trim())
            .then((data) => {
                setInputTag('');
                dispatch(tagActions.setListTag(data.listTag));
                return noteService.update(note._id, {
                    tags: [...tagOfNote.map((t) => t._id), data.tag._id],
                });
            })
            .then((data) => {
                dispatch(noteActions.updateNote(data));
            });
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        if (inputValue.trim().length === 0) {
            return setInputTag('');
        }
        setInputTag(inputValue);
    };

    useEffect(() => {
        if (visible) {
            inputRef.current?.querySelector('input')?.focus();
        }
    }, [visible]);

    return (
        <>
            <TippyButton
                onClick={() => setVisible(true)}
                className={styles.btn}
                content='Thêm thẻ'
                placement='top'
            >
                <div className={styles.icon}>
                    <AddTagSolidIcon />
                </div>
            </TippyButton>
            <TippyHeadLess
                disableClickOutside={true}
                visible={visible && Boolean(inputTag)}
                setVisible={setVisible}
                placement='top-start'
                className={classNames('tippy', cx('dropdown-wrapper'))}
                dropdown={
                    <div
                        className={classNames(styles.dropdown, {
                            tippy__dropdown: !(isExistsTag && matchTag.length === 0),
                        })}
                    >
                        {!isExistsTag && (
                            <div className={cx('dropdown-header')}>
                                <div onClick={handleCreateTag} className={cx('dropdown-name')}>
                                    <AddTagSolidIcon />
                                    Tạo thẻ <span>"{inputTag}"</span>
                                </div>
                                <div className={cx('dropdown-tab')}>Tab</div>
                            </div>
                        )}

                        <div
                            className={cx({
                                'dropdown-list': !isExistsTag && matchTag.length > 0,
                            })}
                        >
                            {matchTag.map((tag) => {
                                const result = charMatchString(tag.name, inputTag);

                                return (
                                    <div
                                        onClick={() => handleAddTag(tag)}
                                        key={tag._id}
                                        className='tippy__dropdown-item'
                                        style={{ fontWeight: 400 }}
                                    >
                                        <span style={{ fontWeight: 600 }}>{result.match}</span>
                                        {result.noMatch}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
            >
                <div ref={inputRef} className={styles.input__wrapper}>
                    <AutosizeInput
                        autoComplete='off'
                        onFocus={() => setVisible(true)}
                        onBlur={() => setVisible(false)}
                        className={cx('input', {
                            input__focus: visible,
                            input__blur: !visible && inputTag,
                            input__hide: !visible && note.tags.length > 0 && !inputTag,
                        })}
                        value={inputTag}
                        onChange={(e) => handleChangeInput(e)}
                        maxLength={50}
                        placeholder={visible ? 'Nhập để thêm...' : 'Thêm thẻ'}
                    />
                </div>
            </TippyHeadLess>
        </>
    );
}
export default FooterAddTag;
