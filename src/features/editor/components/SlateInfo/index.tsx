import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MdDelete } from 'react-icons/md';

import { useAppSelector } from 'app/hooks';

import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function SlateInfo() {
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: '',
    });
    const isToolbar = useAppSelector((state) => state.editor.isToolbar);
    const { listNote } = useAppSelector((state) => state.note);

    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n');

    const note = useMemo(() => listNote.find((note) => note._id === noteId), [listNote, noteId]);
    

    useEffect(() => {
        if (note?.updatedAt) {
            let new_date = new Date(note?.updatedAt);
            const [day, month, year] = new_date.toLocaleDateString().split('/');
            setDate((prev) => ({ ...prev, day, month, year }));
        }
    }, [note?.updatedAt]);

    return (
        <div className={cx('wrapper', { hide: isToolbar })}>
            {note?.isTrash && (
                <div className={cx('is-trash')}>
                    <MdDelete size={18} color='#fff' />
                    Ghi chú trong thùng rác
                </div>
            )}
            <div className={cx('date')}>
                Chỉnh sửa lần cuối vào {date.day} thg {date.month}, {date.year}
            </div>
        </div>
    );
}

export default SlateInfo;
