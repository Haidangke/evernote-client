import { CustomHome } from 'assets/icons';
import background from 'assets/images/background.png';
import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

function Home() {
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
            <div className={cx('main')}></div>
        </div>
    );
}

export default Home;
