import classNames from 'classnames/bind';
import _ from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import { useAppSelector } from 'app/hooks';
import { SortIcon, TagIcon } from 'components/Icons';
import SearchInput from 'components/Input/SearchInput';
import { TippyButton } from 'components/Tippy';
import TagMore from '../TagMore';

import styles from './TagSlideLarge.module.scss';
const cx = classNames.bind(styles);

function TagSlideLarge() {
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
                        <TippyButton placement='bottom' content='Cách sắp xếp'>
                            <SortIcon className={cx('icon')} />
                        </TippyButton>
                    </div>
                </div>
                <div className={cx('search')}>
                    <SearchInput
                        placeholder='Tìm thẻ'
                        value={searchValue}
                        setValue={setSearchValue}
                    />
                </div>
            </header>
            <main className={cx('main')}>
                {tagsDivide.map((tagDivide) => (
                    <div key={tagDivide.title} className={cx('component')}>
                        <div className={cx('title')}>{tagDivide.title.toUpperCase()}</div>
                        <>
                            {tagDivide.list
                                .filter((tag) => tag.name.includes(searchValue.trim()))
                                .map((tag) => (
                                    <div key={tag._id} className={cx('item')}>
                                        <span className={cx('name')}>{tag.name}</span>
                                        {/* <span className={cx('quantity')}>({tag.quantity})</span> */}
                                        <span className={cx('other')}>
                                            {/* <IoIosMore width={16} height={16} /> */}
                                            <TagMore tag={tag} />
                                        </span>
                                    </div>
                                ))}
                        </>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default TagSlideLarge;
