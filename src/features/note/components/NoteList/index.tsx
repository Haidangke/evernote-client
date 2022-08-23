import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import useWindowWidth from 'hooks/useWindowWidth';
import { useAppSelector } from 'app/hooks';
import List from './List';
import Actions from './Actions';
import Title from './Title';

import { Sort } from 'config/actions';

import styles from './NoteList.module.scss';
const cx = classNames.bind(styles);

function NoteList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b');
    const isShow = searchParams.get('an');
    const expand = searchParams.get('fs');

    const { notebooks } = useAppSelector((state) => state.notebook);
    const { listNote } = useAppSelector((state) => state.note);

    const notebook = notebooks.find((notebook) => notebook._id === notebookId);
    const listNoteFilter = useMemo(
        () => listNote.filter((note) => (notebookId ? note.notebook === notebookId : note)),
        [listNote, notebookId]
    );

    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });
    const [maxWidth, setMaxWidth] = useState(600);
    //action
    const [sort, setSort] = useState<Sort>('updatedAt');
    const width = useWindowWidth();

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
        if (width > 0) setMaxWidth(width / 3);
    }, [width]);

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
            <div className={cx('wrapper')}>
                <header className={styles.header}>
                    <Title notebook={notebook?.name} />
                    <div className={cx('concern')}>
                        <div className={cx('total')}>{listNoteFilter.length} ghi chú</div>
                        <Actions sort={sort} setSort={setSort} />
                    </div>
                </header>

                <div className={cx('list')}>
                    <List sort={sort} />
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
