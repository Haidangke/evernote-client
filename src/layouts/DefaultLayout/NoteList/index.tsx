import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import useWindowWidth from 'hooks/useWindowWidth';
import useLocationPage from 'hooks/useLocationPage';
import { useAppSelector } from 'app/hooks';
import List from './components/List';
import Actions from './components/Actions';

import { NoteTitleIcon, BookTitleIcon } from 'assets/icons';
import { Sort } from 'config/actions';
import styles from './NoteList.module.scss';

const cx = classNames.bind(styles);

function NoteList() {
    const page = useLocationPage();

    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    const notebookId = searchParams.get('b');

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
        if (listNote.length === 0) return;

        if (!listNote.some((note) => note._id === noteId)) {
            searchParams.set('n', listNoteFilter[0]?._id);
        }
        setSearchParams(searchParams);
    }, [listNote, noteId, notebooks, listNoteFilter, page, searchParams, setSearchParams]);

    useEffect(() => {
        if (width > 0) setMaxWidth(width / 3);
    }, [width]);

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
                <header className={cx('header')}>
                    <div className={cx('title')}>
                        {page === 'note' && <NoteTitleIcon className={cx('icon-note')} />}
                        {page === 'notebook' && <BookTitleIcon className={cx('icon-book')} />}
                        <span>
                            {page === 'note' && 'Ghi chú'}
                            {page === 'notebook' && notebook?.name}
                        </span>
                    </div>
                    <div className={cx('concern')}>
                        <div className={cx('total')}>{listNoteFilter?.length} ghi chú</div>
                        <Actions sort={sort} setSort={setSort} />
                    </div>
                </header>
                <div className={cx('table')}>
                    <List sort={sort} />
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
