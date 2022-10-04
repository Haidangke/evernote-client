import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';

import useWindowWidth from 'hooks/useWindowWidth';
import useLocationPage from 'hooks/useLocationPage';
import { useAppSelector } from 'app/hooks';
import List from './List';
import Actions from './Actions';
import Title from './Title';
import { Sort } from 'config/actions';

import styles from './NoteList.module.scss';

function NoteList() {
    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });
    const [maxWidth, setMaxWidth] = useState(600);
    //action
    const [sort, setSort] = useState<Sort>('updatedAt');
    const width = useWindowWidth();

    const page = useLocationPage();
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b');
    const isShow = searchParams.get('an');
    const expand = JSON.parse(searchParams.get('fs') || 'false');

    const { notebooks } = useAppSelector((state) => state.notebook);
    const { listNote } = useAppSelector((state) => state.note);
    const { isSmall } = useAppSelector((state) => state.sidebar);

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

    useEffect(() => {
        if (width === 0) return;
        if (isSmall) {
            setMaxWidth(width - 560);
        } else {
            setMaxWidth(width - 900);
        }
    }, [width, isSmall]);

    if (!isShow || expand) return <></>;

    return (
        <Resizable
            enable={{ right: true }}
            maxWidth={maxWidth}
            minWidth={280}
            size={{ width: resizable.width, height: resizable.height }}
            onResizeStop={(e, direction, ref, d) => {
                setResizable({
                    width: resizable.width + d.width,
                    height: resizable.height + d.height,
                });
            }}
        >
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <Title notebook={notebook?.name} />
                    <div className={styles.concern}>
                        <div className={styles.total}>{listNoteFilter.length} ghi chú</div>
                        <Actions sort={sort} setSort={setSort} />
                    </div>
                </header>

                <div className={styles.list}>
                    <List listNote={listNoteFilter} />
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
