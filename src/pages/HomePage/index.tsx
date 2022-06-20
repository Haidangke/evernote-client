import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddNoteIcon, ArrowLeftIcon, CustomHome, OtherIcon } from 'assets/icons';
import background from 'assets/images/background.png';

import styles from './HomePage.module.scss';
import { useEffect } from 'react';
import { fetchListNote } from 'app/thunk/listNoteThunk';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useAppDispatch();
    const { listNote, isFetched } = useAppSelector((state) => state.listNote);

    useEffect(() => {
        if (!isFetched) {
            dispatch(fetchListNote({}));
        }
    }, [dispatch, isFetched]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src={background} alt='background' />
                <div></div>
            </div>

            <header className={cx('header')}>
                <div className={cx('left')}>Xin chào!</div>
                <div className={cx('right')}>
                    <div className={cx('day')}>CHỦ NHẬT, 19 THÁNG 6, 2022</div>
                    <button className={cx('btn')}>
                        <CustomHome />
                        Tùy chỉnh
                    </button>
                </div>
            </header>
            <div className={cx('main')}>
                <div className={cx('main-header')}>
                    <div className={cx('main-title')}>
                        <span>Ghi chú</span>
                        <ArrowLeftIcon width={14} height={14} />
                    </div>
                    <div className={cx('main-btn')}>
                        <span>
                            <AddNoteIcon />
                        </span>
                        <span>
                            <OtherIcon />
                        </span>
                    </div>
                </div>
                <div className={cx('tab')}>
                    <span className={cx('tab-item', 'tab__active')}>Gần đây</span>
                    <span className={cx('tab-item')}>Được đề xuất</span>
                </div>
                <div className={cx('cards')}>
                    {listNote.map((note) => (
                        <div key={note._id} className={cx('card')}>
                            <div className={cx('card-body')}>
                                <div className={cx('card-title')}>{note.title}</div>
                                <div className={cx('card-content')}>
                                    Đây là nội dung của ghi chú
                                </div>
                            </div>
                            <div className={cx('card-time')}>1 phút trước</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
