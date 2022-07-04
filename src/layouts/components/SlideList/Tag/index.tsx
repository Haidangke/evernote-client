import { useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';

import { OtherSmallIcon, SortIcon, TagIcon } from 'assets/icons';
import { TippyButton } from 'components/Tippy';
import { useAppSelector } from 'app/hooks';
import SearchInput from 'components/SearchInput';

import styles from './SlideTag.module.scss';
const cx = classNames.bind(styles);

function SlideTag() {
    const tagRef = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const { listTag } = useAppSelector((state) => state.tag);
    const titles = useMemo(
        () => _.uniq(listTag.map((tag) => tag.name.trim().substring(0, 1)).sort()),
        [listTag]
    );

    const tagsDivide = useMemo(
        () =>
            titles
                .map((title) => {
                    const dauraItem = {
                        title,
                        list: listTag.filter((tag) => tag.name.trim().substring(0, 1) === title),
                    };
                    return dauraItem;
                })
                .filter(
                    (title) =>
                        title.list.filter((tag) => tag.name.includes(searchValue.trim())).length > 0
                ),
        [listTag, searchValue, titles]
    );

    return (
        <div ref={tagRef} className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('topbar')}>
                    <span>Thẻ</span>
                    <div className={cx('button')}>
                        <TippyButton placement='bottom' content='Tạo thẻ mới'>
                            <TagIcon className={cx('icon')} />
                        </TippyButton>
                        <TippyButton placement='bottom' content='Cách sắp xếp'>
                            <SortIcon className={cx('icon')} />
                        </TippyButton>
                    </div>
                </div>
                <SearchInput placeholder='Tìm thẻ' value={searchValue} setValue={setSearchValue} />
            </header>
            <main className={cx('main')}>
                {tagsDivide.map((tagDivide) => (
                    <div key={tagDivide.title} className={cx('component')}>
                        <div className={cx('title')}>{tagDivide.title.toUpperCase()}</div>
                        <div className={cx('list')}>
                            {tagDivide.list
                                .filter((tag) => tag.name.includes(searchValue.trim()))
                                .map((tag) => (
                                    <div key={tag._id} className={cx('item')}>
                                        <span className={cx('name')}>{tag.name}</span>
                                        <span className={cx('quantity')}>({tag.quantity})</span>
                                        <span className={cx('other')}>
                                            <OtherSmallIcon width={16} height={16} />
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default SlideTag;
