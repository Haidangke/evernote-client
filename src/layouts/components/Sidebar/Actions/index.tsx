import { useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import classnames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';

import { AddIcon, ArrowDownIcon, CloseIcon, NoteSolidIcon, TodoPrimaryIcon } from 'assets/icons';

import Popper from 'components/Popper';
import { useAppSelector } from 'app/hooks';
import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './Actions.module.scss';
import useAddNote from 'hooks/useAddNote';


const cx = classnames.bind(styles);

function Actions() {
    const { isSmall } = useAppSelector((state) => state.sidebar);
    const { listNote } = useAppSelector((state) => state.note);
    const [filter, setFilter] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const [isAdd, setIsAdd] = useState(false);
    const addRef = useRef(null);

    const addNote = useAddNote();

    const handleAdd = () => {
        if (!isAdd) {
            setIsAdd(true);
        } else {
            setIsAdd(false);
            addNote();
        }
    };

    useOnClickOutside(addRef, () => setIsAdd(false));
    return (
        <div className={cx('wrapper', { small: isSmall })}>
            <div>
                <Tippy
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
                </Tippy>
            </div>

            <div ref={addRef} className={cx('new', { new__focus: isAdd })}>
                <div onClick={handleAdd} className={cx('btn', 'btn-note')}>
                    <div className={cx('btn-content')}>
                        <AddIcon />
                        <span>Mới</span>
                    </div>
                    <ArrowDownIcon className={cx('icon-arrow')} width={18} height={18} />
                </div>
                <div className={cx('new-menu')}>
                    <div className={cx('btn', 'btn-todo')}>
                        <div className={cx('btn-content')}>
                            <TodoPrimaryIcon />
                            <span>Nhiệm vụ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Actions;
