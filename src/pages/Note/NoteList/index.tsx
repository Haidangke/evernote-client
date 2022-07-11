import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import useWindowSize from 'hooks/useWindowSize';
import { useAppSelector } from 'app/hooks';
import List from './components/List';
import Actions from './components/Actions';

import { NoteListIcon } from 'assets/icons';
import { Sort } from 'config/actions';
import styles from './NoteList.module.scss';

const cx = classNames.bind(styles);

function NoteList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('noteId');

    const { listNote } = useAppSelector((state) => state.note);

    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });
    const [maxWidth, setMaxWidth] = useState(600);
    //action
    const [sort, setSort] = useState<Sort>('updatedAt');
    const [width] = useWindowSize();

    useEffect(() => {
        if (listNote.length === 0) return;

        if (!listNote.some((note) => note._id === noteId)) {
            searchParams.set('noteId', listNote[0]._id);
            setSearchParams(searchParams);
        }
    }, [listNote, noteId, searchParams, setSearchParams]);

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
                        <NoteListIcon className={cx('title-icon')} />
                        <span>Ghi chú</span>
                    </div>
                    <div className={cx('concern')}>
                        <div className={cx('total')}>{listNote?.length} ghi chú</div>
                        <Actions sort={sort} setSort={setSort} />
                    </div>
                </header>
                <div className={cx('table')}>
                    <div className={cx('table-header')}>
                        <div className={cx('column-header')}>Tiêu đề</div>
                        <div className={cx('column-header')}>Đã cập nhật</div>
                        <div className={cx('column-header')}>Thẻ</div>
                    </div>

                    <List sort={sort} />
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
