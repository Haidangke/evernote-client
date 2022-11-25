import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useLocationPage from 'hooks/useLocationPage';
import { useAppSelector } from 'app/hooks';
import { SortConfig } from 'config/actions';

import { TippyButton, TippySort } from 'components/Tippy';
import { ViewIcon } from 'components/Icons';
import NoteList from './NoteList';
import NoteTitle from './NoteTitle';
import NoteFilter from './NoteFilter';
import FilterList from './FilterList';
import NoteTableWrapper from './NoteTableWrapper';

import styles from './NoteTable.module.scss';

function NoteTable() {
    const [sort, setSort] = useState<SortConfig>('updatedAt');
    const filter = useAppSelector((state) => state.note.filter);

    const tagsFilter = filter.tags;
    const notebookFilter = filter.notebook;
    const createdAtFilter = filter.createdAt;
    const updatedAtFilter = filter.updatedAt;

    const page = useLocationPage();
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b');

    const { notebooks } = useAppSelector((state) => state.notebook);
    const { listNote } = useAppSelector((state) => state.note);

    const notebook = notebooks.find((notebook) => notebook._id === notebookId);

    const listNoteFilter = useMemo(() => {
        if (page === 'recycle') return listNote.filter((note) => note.isTrash);

        return listNote
            .filter((note) => !note.isTrash)
            .filter((note) => (notebookId ? note.notebook === notebookId : note))
            .sort((x, y) => {
                if (sort === 'title') return x.title.localeCompare(y.title);
                return new Date(y[sort]).getTime() - new Date(x[sort]).getTime();
            })
            .filter((note) =>
                tagsFilter.length === 0
                    ? note
                    : tagsFilter.find((tag) => note.tags.map((tag) => tag._id).includes(tag)) &&
                      !tagsFilter.find((tag) => !note.tags.map((tag) => tag._id).includes(tag))
            )
            .filter((note) => (notebookFilter ? note.notebook === notebookFilter : note))
            .filter((note) => {
                if (!createdAtFilter) {
                    return note;
                } else {
                    const [year, month, day] = note.createdAt.split('T')[0].split('-');
                    const noteTime = new Date(`${month}/${day}/${year}`).getTime();

                    const [start, end] = createdAtFilter.date;
                    const startTime = new Date(start).getTime();
                    const endTime = new Date(end).getTime();

                    if (start === end) {
                        return noteTime === startTime;
                    } else {
                        return noteTime >= startTime && noteTime <= endTime;
                    }
                }
            })
            .filter((note) => {
                if (!updatedAtFilter) {
                    return note;
                } else {
                    const [year, month, day] = note.createdAt.split('T')[0].split('-');
                    const noteTime = new Date(`${month}/${day}/${year}`).getTime();

                    const [start, end] = updatedAtFilter.date;
                    const startTime = new Date(start).getTime();
                    const endTime = new Date(end).getTime();

                    if (start === end) {
                        return noteTime === startTime;
                    } else {
                        return noteTime >= startTime && noteTime <= endTime;
                    }
                }
            });
    }, [
        updatedAtFilter,
        createdAtFilter,
        tagsFilter,
        notebookFilter,
        listNote,
        notebookId,
        page,
        sort,
    ]);

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

                            <TippyButton content='Chế độ xem' placement='top'>
                                <ViewIcon className={styles.icon} />
                            </TippyButton>
                        </div>
                    </div>
                </header>
                {page !== 'recycle' && <FilterList />}

                <NoteList
                    listNote={listNoteFilter}
                    isFilter={Boolean(
                        tagsFilter.length > 0 ||
                            notebookFilter ||
                            createdAtFilter ||
                            updatedAtFilter
                    )}
                />
            </div>
        </NoteTableWrapper>
    );
}

export default NoteTable;
