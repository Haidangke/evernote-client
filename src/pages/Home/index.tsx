import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Widgets from './components/Widgets';
import { CustomHome } from 'assets/icons';
import { dailyConfig } from 'config/date';

import background from 'assets/images/background.png';

import styles from './HomePage.module.scss';
const cx = classNames.bind(styles);

function Home() {
    const [y, setY] = useState(0);
    const [isHalfBG, setIsHalfBG] = useState(false);
    const [direction, setDirection] = useState('');
    const homeRef = useRef<HTMLDivElement>(null);
    const [date, setDate] = useState('');

    const handleScroll = useCallback(
        (e: any) => {
            const scrollTop = e.target.scrollTop;
            if (y > scrollTop) {
                setDirection('top');
            } else if (y < scrollTop) {
                setDirection('down');
            }
            setY(scrollTop);
        },
        [y]
    );

    useEffect(() => {
        if (y === 100 && direction === 'down') {
            scrollToTop(200);
        }
        if (y === 100 && direction === 'top') {
            scrollToTop(0);
        }
        if (y > 100 && direction === 'down') {
            setIsHalfBG(true);
        }
        if (y <= 100 && direction === 'top') {
            setIsHalfBG(false);
        }
    }, [direction, y]);

    const scrollToTop = (top: number) => {
        homeRef.current?.scrollTo({
            top,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const [today] = new Date().toString().split(' ');
        const daily = dailyConfig.find((day) => day.value === today)?.name || '';
        const date = new Date().toLocaleDateString('vi-VN').toString();
        const [day, month, year] = date.split('/');

        setDate(`${daily}, ${day}, tháng ${month}, ${year}`);
    }, []);

    return (
        <div onScroll={handleScroll} ref={homeRef} className={cx('wrapper')}>
            <div className={cx('header')}>
                <header className={cx('topbar')}>
                    <div className={cx('left')}>Xin chào!</div>
                    <div className={cx('right')}>
                        {date && <div className={cx('day')}>{date}</div>}
                        <button className={cx('btn')}>
                            <CustomHome />
                            Tùy chỉnh
                        </button>
                    </div>
                </header>
                <LazyLoadImage
                    wrapperClassName={cx('image-wrapper')}
                    className={cx('image', {
                        image__half: isHalfBG,
                        image__noHalf: !isHalfBG && direction === 'top',
                    })}
                    alt='background'
                    effect='blur'
                    src={background}
                />
            </div>
            <div className={cx('main')}>
                <Widgets />
            </div>
        </div>
    );
}

export default Home;
