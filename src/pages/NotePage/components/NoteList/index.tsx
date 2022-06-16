import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import useWindowSize from 'hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchListNote } from 'app/thunk/listNoteThunk';

import styles from './NoteList.module.scss';
import { FilterIcon, NoteListIcon, SortIcon, ViewIcon } from 'assets/icons';
import { selectListNote } from 'app/slice/listNoteSlice';

const cx = classNames.bind(styles);

function NoteList() {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('noteId');

    const listNote = useAppSelector(selectListNote);

    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });
    const [maxWidth, setMaxWidth] = useState(600);
    const [widthWindow] = useWindowSize();

    useEffect(() => {
        if (!listNote.some((note) => note._id === noteId) && listNote.length !== 0) {
            searchParams.set('noteId', listNote[0]._id);
            setSearchParams(searchParams);
        }
    }, [listNote, noteId, searchParams, setSearchParams]);

    useEffect(() => {
        dispatch(fetchListNote({}));
    }, [dispatch]);

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
                    <div className={cx('top')}>
                        <NoteListIcon className={cx('top-icon')} />
                        <div className={cx('top-title')}>Ghi chú</div>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('bottom-total')}>{listNote?.length} ghi chú</div>
                        <div className={cx('bottom-btn')}>
                            <SortIcon className={cx('bottom-icon')} />
                            <FilterIcon className={cx('bottom-icon')} />
                            <ViewIcon className={cx('bottom-icon')} />
                        </div>
                    </div>
                </header>
                <div className={cx('main')}>
                    <div className={cx('list', 'list-header')}>
                        <div className={cx('item', 'item-header')}>Tiêu đề</div>
                        <div className={cx('item', 'item-header')}>Đã cập nhật</div>
                        <div className={cx('item', 'item-header')}>Thẻ</div>
                    </div>

                    {/* data fetch */}

                    {listNote.length === 0 ? (
                        <></>
                    ) : (
                        <div className={cx('list-body')}>
                            {listNote?.map((item, index) => (
                                <div
                                    onClick={() => {
                                        searchParams.set('noteId', item._id);
                                        setSearchParams(searchParams);
                                    }}
                                    key={item._id}
                                    className={cx('list', 'item-main', {
                                        'list-b-h': index % 2 === 0,
                                        'item-main__active': noteId === item._id,
                                    })}
                                >
                                    <div className={cx('item', 'item-body')}>
                                        {item.title || 'Chưa có tiêu đề'}
                                    </div>
                                    <div className={cx('item', 'item-body')}>34 phút trước</div>
                                    <div className={cx('item', 'item-body')}></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
