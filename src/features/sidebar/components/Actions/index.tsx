import classnames from 'classnames/bind';
import { useMemo, useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import {
    AddIcon,
    ArrowDownIcon,
    CloseIcon,
    NoteIcon,
    NoteSolidIcon,
    TodoPrimaryIcon,
} from 'components/Icons';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import useAddNote from 'hooks/useAddNote';
import useOnClickOutside from 'hooks/useOnclickOutside';
import useNavigateParams from 'hooks/useNavigateParams';
import { TippyHeadLessOneWay } from 'components/Tippy';

import styles from './Actions.module.scss';
import { editorActions } from 'features/editor/editorSlice';

const cx = classnames.bind(styles);

function Actions() {
    const dispatch = useAppDispatch();
    const { isSmall } = useAppSelector((state) => state.sidebar);
    const { listNote } = useAppSelector((state) => state.note);

    const [isSearch, setIsSearch] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const search = useAppSelector((state) => state.editor.search);

    const addNote = useAddNote();
    const navigate = useNavigateParams();

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

    const listNoteTitle = useMemo(
        () =>
            listNote
                .filter((note) => !note.isTrash)
                .map((note) => (note.title ? note : { ...note, title: 'Chưa có tiêu đề' }))
                .filter((note) => note.title.trim().toLowerCase().includes(search.toLowerCase())),
        [listNote, search]
    );

    const listNoteSearch = useMemo(
        () =>
            listNote
                .filter((note) => !note.isTrash)
                .map((note) => ({ ...note, content: JSON.parse(note.content) }))
                .map((note) => ({
                    ...note,
                    content: note?.content
                        .map((item: any) => item?.children?.map((x: any) => x.text).join(''))
                        .join(' '),
                }))

                .filter((note) => note.content.trim().includes(search)),
        [listNote, search]
    );

    const handleNavigateNote = (_id: string) => {
        navigate('note', { n: _id });
        setIsSearch(false);
    };

    return (
        <div className={cx('wrapper', { small: isSmall })}>
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
                            search && (listNoteSearch.length > 0 || listNoteTitle.length > 0),
                    })}
                    dropdown={
                        search && (listNoteSearch.length > 0 || listNoteTitle.length > 0) ? (
                            <>
                                {listNoteTitle.length > 0 && (
                                    <div className={cx('search-focus__content')}>
                                        <div className={cx('search-focus__title')}>
                                            Khớp với tiêu đề
                                        </div>
                                        <div className={cx('search-focus__list')}>
                                            {listNoteTitle.map((note) => (
                                                <div
                                                    onClick={() => handleNavigateNote(note._id)}
                                                    key={note._id}
                                                    className={cx('search-focus__item')}
                                                >
                                                    <NoteSolidIcon className='search-icon' />
                                                    <div className={cx('search-focus__name')}>
                                                        {note.title || 'Chưa có tiêu đề'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {listNoteSearch.length > 0 && (
                                    <div className={cx('search-focus__content')}>
                                        <div className={cx('search-focus__title')}>
                                            Khớp với nội dung
                                        </div>
                                        <div className={cx('search-focus__list')}>
                                            {listNoteSearch.map((note) => (
                                                <div
                                                    onClick={() => handleNavigateNote(note._id)}
                                                    key={note._id}
                                                    className={cx('search-focus__item')}
                                                >
                                                    <NoteSolidIcon className='search-icon' />
                                                    <div className={cx('search-focus__name')}>
                                                        {note.title || 'Chưa có tiêu đề'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <></>
                        )
                    }
                >
                    <div
                        className={cx('search', {
                            'search-focus': isSearch,
                            'search-focus--full':
                                search && (listNoteSearch.length > 0 || listNoteTitle.length > 0),
                        })}
                    >
                        <IoSearchSharp className={cx('search-icon')} />
                        <div className={cx('search-input')}>
                            <input
                                value={search}
                                onChange={(e) => dispatch(editorActions.setSearch(e.target.value))}
                                type='text'
                                placeholder='Tìm kiếm'
                            />
                        </div>
                        {search && isSearch && (
                            <CloseIcon
                                onClick={() => dispatch(editorActions.setSearch(''))}
                                className={cx('search-cancel')}
                            />
                        )}
                    </div>
                </TippyHeadLessOneWay>
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
