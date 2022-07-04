import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAppSelector } from 'app/hooks';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function Info() {
    const isToolbar = useAppSelector((state) => state.toolbar.isToolbar);
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('noteId');
    const { listNote } = useAppSelector((state) => state.note);
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: '',
    });
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
            Chỉnh sửa lần cuối vào {date.day} thg {date.month}, {date.year}
        </div>
    );
}

export default Info;
