import { useState } from 'react';
import classnames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';

import styles from 'layouts/components/Sidebar/Sidebar.module.scss';
import { AddIcon, ArrowDownIcon, NoteSolidIcon, SearchIcon } from 'assets/icons';
import Popper from 'components/Popper';

const cx = classnames.bind(styles);

function Actions() {
    const [isSearch, setIsSearch] = useState(false);
    return (
        <div className={cx('actions')}>
            <TippyHeadless
                placement='bottom-start'
                interactive
                visible={isSearch}
                onClickOutside={() => setIsSearch(false)}
                render={(attrs) => (
                    <Popper>
                        <div className={cx('search-focus__content')} {...attrs}>
                            <div className={cx('search-focus__title')}>Đến...</div>
                            <div className={cx('search-focus__list')}>
                                <div className={cx('search-focus__item')}>
                                    <NoteSolidIcon />
                                    <div className={cx('search-focus__name')}>Đi học</div>
                                </div>
                            </div>
                        </div>
                    </Popper>
                )}
            >
                <div className={cx('search', { 'search-focus': isSearch })}>
                    <SearchIcon />
                    <div className={cx('search-input')}>
                        <input
                            onFocus={() => setIsSearch(true)}
                            type='text'
                            placeholder='Tìm kiếm'
                        />
                    </div>
                </div>
            </TippyHeadless>
            <div className={cx('new-btn')}>
                <div className={cx('new-btn__left')}>
                    <AddIcon />
                    <span>Mới</span>
                </div>
                <ArrowDownIcon width={18} height={18} />
            </div>
        </div>
    );
}

export default Actions;
