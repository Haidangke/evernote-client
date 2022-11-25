import { memo } from 'react';

import {
    TagIcon,
    NotebookIcon,
    NotebookDfIcon,
    CreatedAtFilterIcon,
    UpdatedAtFilterIcon,
} from 'components/Icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import FilterItem from './FilterItem';

import styles from './FilterList.module.scss';
import { noteActions } from 'features/note/noteSlice';

export type TypeFilter = 'tag' | 'notebook' | 'updatedAt' | 'createdAt' | 'all';

function FilterList() {
    const dispatch = useAppDispatch();

    const tags = useAppSelector((state) => state.tag.listTag);
    const notebooks = useAppSelector((state) => state.notebook.notebooks);
    const filter = useAppSelector((state) => state.note.filter);

    const tagsFilter = tags.filter((tag) => filter.tags.includes(tag._id));
    const notebookFilter = notebooks.find((notebook) => notebook._id === filter.notebook);

    const updatedAtFilter = filter.updatedAt;
    const createdAtFilter = filter.createdAt;

    const handleClearFilter = (type: TypeFilter, _id?: string) => {
        const newFilter = { ...filter };
        if (type === 'tag') {
            newFilter.tags = [...filter.tags].filter((tag) => tag !== _id);
        } else if (type === 'notebook' || type === 'createdAt' || type === 'updatedAt') {
            newFilter[type] = null;
        } else if (type === 'all') {
            newFilter.tags = [];
            newFilter.notebook = null;
            newFilter.createdAt = null;
            newFilter.updatedAt = null;
        }

        dispatch(noteActions.setFilter({ ...newFilter }));
    };

    if (tagsFilter.length === 0 && !notebookFilter && !createdAtFilter && !updatedAtFilter)
        return <></>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.left}>Bộ lọc</div>
                <div onClick={() => handleClearFilter('all')} className={styles.right}>
                    Xóa
                </div>
            </div>
            <div className={styles.main}>
                {/* tags */}
                {tagsFilter.map((item) => (
                    <FilterItem
                        key={item._id}
                        Icon={TagIcon}
                        _id={item._id}
                        name={item.name}
                        type='tag'
                        onClear={handleClearFilter}
                    />
                ))}
                {/* notebook */}
                {notebookFilter && (
                    <FilterItem
                        name={notebookFilter.name}
                        Icon={notebookFilter.isDefault ? NotebookDfIcon : NotebookIcon}
                        type='notebook'
                        onClear={handleClearFilter}
                    />
                )}
                {/* createdAt */}
                {createdAtFilter && (
                    <FilterItem
                        name={createdAtFilter.title}
                        Icon={CreatedAtFilterIcon}
                        type='createdAt'
                        onClear={handleClearFilter}
                    />
                )}
                {/* updatedAt */}
                {updatedAtFilter && (
                    <FilterItem
                        name={updatedAtFilter.title}
                        Icon={UpdatedAtFilterIcon}
                        type='updatedAt'
                        onClear={handleClearFilter}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(FilterList);
