import classNames from 'classnames/bind';
import { SearchIcon, SortIcon, TagIcon } from '~/assets/icons';
import ButtonTippy from '~/components/ButtonTippy';

import styles from './Slidebar.module.scss';
const cx = classNames.bind(styles);

function SlidebarTag() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('topbar')}>
                    <span></span>
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
                    <div className={cx('title')}></div>
                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <div className={cx('name')}></div>
                            <div className={cx('quantity')}></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SlidebarTag;
