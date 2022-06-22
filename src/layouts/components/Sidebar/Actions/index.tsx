import { useRef, useState } from 'react';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import {
    AddIcon,
    ArrowDownIcon,
    CloseIcon,
    NoteSolidIcon,
    SearchIcon,
    TodoPrimaryIcon,
} from 'assets/icons';
import Popper from 'components/Popper';
import { useAppSelector } from 'app/hooks';
import styles from './Actions.module.scss';
import useOnClickOutside from 'hooks/useOnclickOutside';

interface ActionsProps {
    isSmallSidebar: boolean;
}

const cx = classnames.bind(styles);

function Actions({ isSmallSidebar }: ActionsProps) {
    const { listNote } = useAppSelector((state) => state.listNote);
    const [filter, setFilter] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const [isAdd, setIsAdd] = useState(false);
    const addRef = useRef(null);

    const handleAdd = () => {
        if (!isAdd) {
            setIsAdd(true);
        } else {
            //api
        }
    };

    useOnClickOutside(addRef, () => setIsAdd(false));
    return (
        <div className={cx('wrapper', { small: isSmallSidebar })}>
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
                                                {filter ? <SearchIcon /> : <NoteSolidIcon />}
                                                <div className={cx('search-focus__name')}>
                                                    {note.title}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Popper>
                    )}
                >
                    <div className={cx('search', { 'search-focus': isSearch })}>
                        <SearchIcon className={cx('search-icon')} />
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
