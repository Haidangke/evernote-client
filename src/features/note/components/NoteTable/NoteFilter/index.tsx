import { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import { FilterIcon } from 'components/Icons';
import { TippyHeadLessOneWay } from 'components/Tippy';
import useOnClickOutside from 'hooks/useOnclickOutside';

import NoteFilterBook from './NoteFilterBook';
import NoteFilterCreatedAt from './NoteFilterCreatedAt';
import NoteFilterTag from './NoteFilterTag';
import NoteFilterUpdatedAt from './NoteFilterUpdatedAt';

import styles from './NoteFilter.module.scss';
const cx = classNames.bind(styles);

export interface FilterConfig {
    tags: Array<string>;
}

function NoteFilter() {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.note.filter);
    const isFilter =
        filter.tags.length > 0 || filter.notebook || filter.updatedAt || filter.createdAt;

    const [visible, setVisible] = useState(false);

    const ref = useRef(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const notebookRef = useRef<HTMLDivElement>(null);
    const createdAtRef = useRef<HTMLDivElement>(null);
    const updatedAtRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    const handleClearFilter = () => {
        dispatch(
            noteActions.setFilter({ tags: [], notebook: null, createdAt: null, updatedAt: null })
        );
    };

    useOnClickOutside(ref, (event: any) => {
        const target = event.target;
        if (
            !tagRef.current?.contains(target) &&
            !notebookRef.current?.contains(target) &&
            !createdAtRef.current?.contains(target) &&
            !updatedAtRef.current?.contains(target) &&
            !iconRef.current?.contains(target)
        ) {
            setVisible(false);
        }
    });

    return (
        <TippyHeadLessOneWay
            disableClickOutside={true}
            placement='bottom-start'
            visible={visible}
            setVisible={setVisible}
            dropdown={
                <div ref={ref} className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.title}>Thêm bộ lọc</div>
                        <div
                            onClick={handleClearFilter}
                            className={cx('delete', {
                                'delete--active': isFilter,
                            })}
                        >
                            Xóa tất cả
                        </div>
                    </div>
                    <NoteFilterTag ref={tagRef} />

                    <NoteFilterBook ref={notebookRef} />

                    <NoteFilterCreatedAt ref={createdAtRef} />

                    <NoteFilterUpdatedAt ref={updatedAtRef} />
                </div>
            }
        >
            <div ref={iconRef} className={styles.icon}>
                <FilterIcon />
            </div>
        </TippyHeadLessOneWay>
    );
}

export default NoteFilter;
