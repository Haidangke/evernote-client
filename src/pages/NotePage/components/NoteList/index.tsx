import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import classNames from 'classnames/bind';

import styles from './NoteList.module.scss';
import { FilterIcon, NoteListIcon, SortIcon, ViewIcon } from '~/components/Icon';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function NoteList() {
    const [, setSearchParams] = useSearchParams();
    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });

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
                        <div className={cx('bottom-total')}>14 ghi chú</div>
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
                    <div className={cx('list-body')}>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <div
                                onClick={() =>
                                    setSearchParams({ note: '628f048ce0f5bad9e19e6cc9' })
                                }
                                key={item}
                                className={cx('list', 'item-main', {
                                    'list-b-h': index % 2 === 0,
                                })}
                            >
                                <div className={cx('item', 'item-body')}>Đi ăn cơm</div>
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
