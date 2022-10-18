import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useLocationPage from 'hooks/useLocationPage';
import { useAppSelector } from 'app/hooks';
import { SortConfig } from 'config/actions';

import NoteList from './NoteList';
import NoteTitle from './NoteTitle';
import NoteFilter from './NoteFilter';
import NoteTableWrapper from './NoteTableWrapper';
import { TippySort } from 'components/Tippy';

import styles from './NoteTable.module.scss';

function NoteTable() {
    const [sort, setSort] = useState<SortConfig>('updatedAt');

    const page = useLocationPage();
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b');

    const { notebooks } = useAppSelector((state) => state.notebook);
    const { listNote } = useAppSelector((state) => state.note);

    const notebook = notebooks.find((notebook) => notebook._id === notebookId);
    const listNoteFilter = useMemo(
        () =>
            listNote
                .filter((note) => (page === 'recycle' ? note.isTrash : !note.isTrash))
                .filter((note) => (notebookId ? note.notebook === notebookId : note))
                .sort((x, y) => {
                    if (sort === 'title') return x.title.localeCompare(y.title);
                    return new Date(y[sort]).getTime() - new Date(x[sort]).getTime();
                }),
        [listNote, notebookId, page, sort]
    );

    useEffect(() => {
        if (listNoteFilter.some((note) => note._id === noteId)) return;
        if (listNoteFilter.length > 0) {
            searchParams.set('n', listNoteFilter[0]?._id);
        } else {
            searchParams.delete('n');
        }
        setSearchParams(searchParams);
    }, [listNoteFilter, noteId, searchParams, setSearchParams]);

    return (
        <NoteTableWrapper>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <NoteTitle notebook={notebook?.name} />
                    <div className={styles.concern}>
                        <div className={styles.total}>{listNoteFilter.length} ghi chú</div>
                        <div className={styles.actions}>
                            <TippySort sort={sort} setSort={setSort} />
                            <NoteFilter />

                            {/* <TippyButton content='Chế độ xem' placement='top'>
                                <ViewIcon className={cx('actions-icon')} />
                            </TippyButton> */}
                        </div>
                    </div>
                </header>

                <div className={styles.list}>
                    <NoteList listNote={listNoteFilter} />
                </div>
            </div>
        </NoteTableWrapper>
    );
}

export default NoteTable;
