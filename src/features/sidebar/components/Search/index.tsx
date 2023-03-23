import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { IoSearchSharp } from 'react-icons/io5';

import { useAppSelector } from 'app/hooks';
import { CloseIcon } from 'components/Icons';
import { TippyHeadLessOneWay } from 'components/Tippy';
import { selectListNote, selectListNotePlainText } from 'features/note/noteSlice';
import ListSearch from './ListSearch';

import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {
    const listNote = useAppSelector(selectListNote);
    const listNotePlainText = useAppSelector(selectListNotePlainText);

    const [isSearch, setIsSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const listNoteTitle = useMemo(
        () =>
            listNote
                .map((note) => (note.title ? note : { ...note, title: 'Chưa có tiêu đề' }))
                .filter((note) =>
                    note.title.trim().toLowerCase().includes(searchValue.toLowerCase().trim())
                ),
        [listNote, searchValue]
    );

    const listNoteContent = useMemo(
        () =>
            listNotePlainText.filter((note) => {
                return note.content.trim().toLowerCase().includes(searchValue.toLowerCase().trim());
            }),
        [listNotePlainText, searchValue]
    );

    return (
        <div>
            <TippyHeadLessOneWay
                placement='bottom-start'
                interactive
                visible={isSearch}
                setVisible={setIsSearch}
                disableContent
                disableAnimation
                className={cx('popper', {
                    'popper--full':
                        searchValue && (listNoteContent.length > 0 || listNoteTitle.length > 0),
                })}
                dropdown={
                    searchValue ? (
                        <>
                            <ListSearch notes={listNoteTitle} match='tiêu đề' />
                            <ListSearch notes={listNoteContent} match='nội dung' />
                        </>
                    ) : (
                        <></>
                    )
                }
            >
                <div
                    className={cx('content', {
                        focus: isSearch,
                        'focus--full':
                            searchValue && (listNoteContent.length > 0 || listNoteTitle.length > 0),
                    })}
                >
                    <IoSearchSharp className={cx('icon')} />
                    <div className={cx('input')}>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type='text'
                            placeholder='Tìm kiếm'
                        />
                    </div>
                    {searchValue && isSearch && (
                        <CloseIcon onClick={() => setSearchValue('')} className={cx('cancel')} />
                    )}
                </div>
            </TippyHeadLessOneWay>
        </div>
    );
}

export default Search;
