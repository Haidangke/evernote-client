import classNames from 'classnames/bind';
import { OtherIcon, SearchIcon, SortIcon, TagIcon } from 'assets/icons';
import ButtonTippy from 'components/ButtonTippy';

import styles from './SlideTag.module.scss';
const cx = classNames.bind(styles);

function SlideTag() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('topbar')}>
                    <span>Thẻ</span>
                    <div className={cx('button')}>
                        <ButtonTippy placement='bottom' content='Tạo thẻ mới'>
                            <TagIcon className={cx('icon')} />
                        </ButtonTippy>
                        <ButtonTippy placement='bottom' content='Cách sắp xếp'>
                            <SortIcon className={cx('icon')} />
                        </ButtonTippy>
                    </div>
                </div>
                <div className={cx('search')}>
                    <input type='text' placeholder='Tìm thẻ' />
                    <SearchIcon />
                </div>
            </header>
            <main className={cx('main')}>
                <div className={cx('component')}>
                    <div className={cx('title')}>0 - 9</div>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <span className={cx('name')}>aaa</span>
                            <span className={cx('quantity')}>(0)</span>
                            <OtherIcon width={16} height={16} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SlideTag;
