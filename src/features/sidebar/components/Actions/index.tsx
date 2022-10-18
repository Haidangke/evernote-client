import classnames from 'classnames/bind';
import { useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import TippyHeadLess from '@tippyjs/react/headless';

import {
    AddIcon,
    ArrowDownIcon,
    CloseIcon,
    NoteIcon,
    NoteSolidIcon,
    TodoPrimaryIcon,
} from 'assets/icons';

import { useAppSelector } from 'app/hooks';
import Popper from 'components/Popper';
import useAddNote from 'hooks/useAddNote';
import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './Actions.module.scss';

const cx = classnames.bind(styles);

function Actions() {
    const { isSmall } = useAppSelector((state) => state.sidebar);
    const { listNote } = useAppSelector((state) => state.note);
    const [filter, setFilter] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const [isAdd, setIsAdd] = useState(false);

    const addNote = useAddNote();

    const handleAdd = () => {
        if (!isAdd) {
            setIsAdd(true);
        } else {
            setIsAdd(false);
            addNote();
        }
    };

    const newRef = useRef(null);

    useOnClickOutside(newRef, () => setIsAdd(false));
    return (
        <div className={cx('wrapper', { small: isSmall })}>
            <div>
                <TippyHeadLess
                    placement='bottom-start'
                    interactive
                    visible={isSearch}
                    onClickOutside={() => setIsSearch(false)}
                    render={(attrs) => (
                        <Popper className={cx('popper')}>
                            <div className={cx('search-focus__content')} {...attrs}>
                                <div className={cx('search-focus__title')}>Đến...</div>
                                <div className={cx('search-focus__list')}>
                                    {listNote
                                        .filter((note) =>
                                            note.title
                                                .trim()
                                                .toLowerCase()
                                                .includes(filter.toLowerCase())
                                        )
                                        .map((note) => (
                                            <div
                                                key={note._id}
                                                className={cx('search-focus__item')}
                                            >
                                                {filter ? (
                                                    <IoSearchSharp className='search-icon' />
                                                ) : (
                                                    <NoteSolidIcon />
                                                )}
                                                <div className={cx('search-focus__name')}>
                                                    {note.title || 'Chưa có tiêu đề'}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Popper>
                    )}
                >
                    <div className={cx('search', { 'search-focus': isSearch })}>
                        <IoSearchSharp className={cx('search-icon')} />
                        <div className={cx('search-input')}>
                            <input
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                onFocus={() => setIsSearch(true)}
                                type='text'
                                placeholder='Tìm kiếm'
                            />
                        </div>
                        {filter && (
                            <CloseIcon
                                onClick={() => setFilter('')}
                                className={cx('search-cancel')}
                            />
                        )}
                    </div>
                </TippyHeadLess>
            </div>

            <div className={cx('new')}>
                <div onClick={handleAdd} className={cx('btn', 'btn-note', 'new-btn')}>
                    <div className={cx('btn-content')}>
                        <AddIcon />
                        <span>Mới</span>
                    </div>
                    <ArrowDownIcon className={cx('icon-arrow')} width={18} height={18} />
                </div>

                {isAdd && (
                    <div ref={newRef} className={cx('new-menu')}>
                        <div onClick={handleAdd} className={cx('btn', 'btn-note')}>
                            <div className={cx('btn-content')}>
                                <NoteIcon />
                                <span>Ghi chú</span>
                            </div>
                            <ArrowDownIcon className={cx('icon-arrow')} width={18} height={18} />
                        </div>
                        <div className={cx('btn', 'btn-todo')}>
                            <div className={cx('btn-content')}>
                                <TodoPrimaryIcon />
                                <span>Nhiệm vụ</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Actions;
