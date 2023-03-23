import { useRef, useState } from 'react';
import classnames from 'classnames/bind';

import { AddIcon, ArrowDownIcon, NoteIcon, TodoPrimaryIcon } from 'components/Icons';

import { useAppSelector } from 'app/hooks';
import useAddNote from 'hooks/useAddNote';
import useOnClickOutside from 'hooks/useOnclickOutside';

import styles from './Actions.module.scss';

const cx = classnames.bind(styles);

function Actions() {
    const { isSmall } = useAppSelector((state) => state.sidebar);

    const [isAdd, setIsAdd] = useState(false);

    const addNote = useAddNote();

    const handleAdd = () => {
        setIsAdd(!isAdd);
        if (isAdd) addNote();
    };

    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsAdd(false));

    return (
        <div className={cx('wrapper')}>
            <div onClick={handleAdd} className={cx('btn', 'btn-note', 'btn-new')}>
                <div className={cx('btn-content')}>
                    <AddIcon />
                    <span style={isSmall ? { display: 'none' } : {}}>Mới</span>
                </div>
                <ArrowDownIcon width={18} height={18} />
            </div>

            {isAdd && (
                <div ref={ref} className={cx('menu', { 'menu--small': isSmall })}>
                    <div onClick={handleAdd} className={cx('btn', 'btn-note')}>
                        <div className={cx('btn-content')}>
                            <NoteIcon />
                            <span>Ghi chú</span>
                        </div>
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
    );
}

export default Actions;
