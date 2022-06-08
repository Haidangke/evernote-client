import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import noteService from '~/services/noteService';

import styles from './NoteList.module.scss';
import { FilterIcon, NoteListIcon, SortIcon, ViewIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

function NoteList() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });

    const { data } = useQuery('notes', async () => await noteService.getAll());
    const notes = data?.data;
    const noteId = searchParams.get('note');

    useEffect(() => {
        if (!noteId && notes && notes[0]) {
            navigate(`/note?note=${notes[0]._id}`);
        }
    }, [notes, navigate, noteId]);

    return (
        <Resizable
            enable={{ right: true }}
            maxWidth={635}
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
                        <div className={cx('bottom-total')}>{notes?.length} ghi chú</div>
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
                    <div className={cx('list-body')}>
                        {notes?.map((item, index) => (
                            <div
                                onClick={() => setSearchParams({ note: item._id })}
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
                </div>
            </div>
        </Resizable>
    );
}

export default NoteList;
