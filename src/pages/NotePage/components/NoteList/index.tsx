import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import useWindowSize from 'hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchListNote } from 'app/thunk/listNoteThunk';
import List from './components/List';
import Actions from './components/Actions';

import { NoteListIcon } from 'assets/icons';
import styles from './NoteList.module.scss';
import { ActionsType } from 'config/actions';

const cx = classNames.bind(styles);

function NoteList() {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('noteId');

    const { listNote, isFetched } = useAppSelector((state) => state.listNote);

    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });
    const [maxWidth, setMaxWidth] = useState(600);
    const [actions, setActions] = useState<ActionsType>({ sort: 'updatedAt' });
    const [widthWindow] = useWindowSize();

    useEffect(() => {
        if (listNote.length === 0) return;

        if (!listNote.some((note) => note._id === noteId)) {
            searchParams.set('noteId', listNote[0]._id);
            setSearchParams(searchParams);
        }
    }, [listNote, noteId, searchParams, setSearchParams]);

    useEffect(() => {
        if (!isFetched) {
            dispatch(fetchListNote({}));
        }
    }, [dispatch, isFetched]);

    useEffect(() => {
        if (widthWindow > 0) {
            const limitSidebar = widthWindow / 3;
            if (limitSidebar < 400) {
                //sidebar = 100% / 3
                setMaxWidth(widthWindow - 500 - limitSidebar);
            } else {
                // sidebar = 400
                setMaxWidth(widthWindow - 900);
            }
        }
    }, [widthWindow]);

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
                        <Actions actions={actions} setActions={setActions} />
                    </div>
                </header>
                <div className={cx('table')}>
                    <div className={cx('table-header')}>
                        <div className={cx('column-header')}>Tiêu đề</div>
                        <div className={cx('column-header')}>Đã cập nhật</div>
                        <div className={cx('column-header')}>Thẻ</div>
                    </div>

                    <List actions={actions} />
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
