import { forwardRef, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import { noteActions } from 'features/note/noteSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ArrowDownIcon, DeleteIcon, TagFilterIcon } from 'components/Icons';
import { TippyHeadLessOneWay } from 'components/Tippy';

import styles from './NoteFilter.module.scss';
const cx = classNames.bind(styles);

interface NoteFilterTagProps {
    fowardRef: any;
}

function NoteFilterTag({ fowardRef }: NoteFilterTagProps) {
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);

    const listTag = useAppSelector((state) => state.tag.listTag);
    const filter = useAppSelector((state) => state.note.filter);

    const tagFilter = filter.tags;

    const handleCheckTag = (tagId: string) => {
        const updateTags = tagFilter.includes(tagId)
            ? tagFilter.filter((tag) => tag !== tagId)
            : [...tagFilter, tagId];

        dispatch(noteActions.setFilter({ ...filter, tags: updateTags }));
    };

    const listTagName = useMemo(
        () => listTag.filter((tag) => tagFilter.includes(tag._id)),
        [tagFilter, listTag]
    );

    return (
        <div className={styles.item}>
            <div className={styles.left}>
                <TagFilterIcon className={styles.itemIcon} />
                <div className={styles.name}>Thẻ</div>
            </div>
            <div className={styles.right}>
                <TippyHeadLessOneWay
                    placement='bottom-start'
                    dropdown={
                        <div ref={fowardRef} className={cx('dropdown-list')}>
                            {listTag.map((tag) => (
                                <label
                                    key={tag._id}
                                    className={cx('dropdown-item')}
                                    htmlFor={tag._id}
                                >
                                    <input
                                        onChange={() => handleCheckTag(tag._id)}
                                        id={tag._id}
                                        type='checkbox'
                                        defaultChecked={tagFilter.includes(tag._id)}
                                    />
                                    <span>{tag.name}</span>
                                </label>
                            ))}
                        </div>
                    }
                    visible={visible}
                    setVisible={setVisible}
                >
                    <div className={styles.input}>
                        {tagFilter.length > 0 ? (
                            <div className={cx('menu')}>
                                {listTagName.map((tag) => (
                                    <div className={cx('menu-tag')} key={tag._id}>
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <input type='text' placeholder='Chọn...' />
                        )}
                        <ArrowDownIcon />
                    </div>
                </TippyHeadLessOneWay>

                <DeleteIcon />
            </div>
        </div>
    );
}

export default forwardRef((props, ref) => <NoteFilterTag {...props} fowardRef={ref} />);
