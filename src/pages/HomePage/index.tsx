import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Scratch, NoteList } from './components/Widgets';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CustomHome } from 'assets/icons';

import background from 'assets/images/background.png';
import { fetchListNote } from 'app/thunk/listNoteThunk';

import styles from './HomePage.module.scss';
const cx = classNames.bind(styles);

function Home() {
    const dispatch = useAppDispatch();
    const { isFetched } = useAppSelector((state) => state.listNote);

    useEffect(() => {
        if (!isFetched) {
            dispatch(fetchListNote({}));
        }
    }, [dispatch, isFetched]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <LazyLoadImage alt='background' effect='blur' src={background} />
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
                <div className={cx('elements')}>
                    <NoteList />
                    <Scratch />
                </div>
            </div>
        </div>
    );
}

export default Home;
