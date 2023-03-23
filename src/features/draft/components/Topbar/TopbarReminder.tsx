import classNames from 'classnames/bind';
import { TippyHeadLess } from 'components/Tippy';
import { useEffect, useState } from 'react';
import Calendar from 'components/Calendar';
import { BiAlarm } from 'react-icons/bi';
import { Note, Tag } from 'types';

import styles from './Topbar.module.scss';
import noteService from 'services/noteService';
import { getFCMToken } from 'firebase-config';
import { useAppDispatch } from 'app/hooks';
import { noteActions } from 'features/note/noteSlice';
import { toastError, toastInfo } from 'components/Toast/toast';
import useLocationPage from 'hooks/useLocationPage';
const cx = classNames.bind(styles);

interface TopbarReminderProps {
    note?: Note<Tag>;
}

function TopbarReminder({ note }: TopbarReminderProps) {
    const page = useLocationPage();
    const dispatch = useAppDispatch();
    const reminder = note?.reminder;
    const noteId = note?._id;

    const date = new Date();
    const [visible, setVisible] = useState(false);
    const [calendar, setCalendar] = useState(new Date());

    const [hours, setHours] = useState(date.getHours().toString().padStart(2, '0'));
    const [minutes, setMinutes] = useState(date.getMinutes().toString().padStart(2, '0'));

    const [reminderValue, setReminderValue] = useState('');

    const handleChangeHours = (e: any) => {
        const value = e.target.value.trim();
        const hours = Number(value);

        if (!Number.isNaN(hours) && hours <= 23 && hours >= 0 && value.length <= 2) {
            setHours(value);
        }
    };

    const handleChangeMinutes = (e: any) => {
        const value = e.target.value;
        const minutes = Number(value);

        if (!Number.isNaN(minutes) && minutes <= 59 && minutes >= 0 && value.length <= 2) {
            setMinutes(value);
        }
    };

    const handleSubmitReminder = async () => {
        const day = calendar.getDate();
        const month = calendar.getMonth();
        const year = calendar.getFullYear();
        const date = new Date(year, month, day, Number(hours), Number(minutes), 0);
        setVisible(false);
        try {
            if (noteId) {
                const token = await getFCMToken();
                const data = await noteService.update(noteId, { reminder: date, token });
                dispatch(noteActions.updateNote(data));
                toastInfo(
                    `Đã đặt thông báo cho "${
                        data.title || 'Chưa có tiêu đề'
                    }" vào lúc ${reminderValue}`
                );
            }
        } catch (error) {
            toastError('Gặp lỗi khi đặt thông báo cho ghi chú');
        }
    };

    useEffect(() => {
        if (reminder) {
            const date = new Date(reminder);
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const nth = date.getDay();
            const day = date.getDate();
            const month = date.getMonth();

            setReminderValue(`${hours}:${minutes}, T${nth + 1}, ${day} tháng ${month + 1}`);
        }
    }, [reminder]);

    return (
        <TippyHeadLess
            placement='bottom'
            visible={visible}
            setVisible={setVisible}
            className={cx('reminder-wrapper')}
            disableContent={page === 'recycle'}
            dropdown={
                <div className={cx('reminder')}>
                    <Calendar
                        value={calendar}
                        onChange={setCalendar}
                        maxDate={undefined}
                        selectRange={false}
                    />
                    <div className={cx('reminder-time')}>
                        <input type='text' value={hours} onChange={handleChangeHours} />
                        <span>:</span>
                        <input type='text' value={minutes} onChange={handleChangeMinutes} />
                    </div>
                    <div className={cx('reminder-btn')}>
                        {reminderValue && (
                            <span className={cx('reminder-btn--warning')}>Xóa lời nhắc</span>
                        )}
                        <span onClick={handleSubmitReminder} className={cx('reminder-btn--info')}>
                            {reminderValue ? 'Sửa lời nhắc' : 'Tạo lời nhắc'}
                        </span>
                    </div>
                </div>
            }
        >
            <div
                className={cx('note-btn', 'reminder-header', {
                    'reminder-header--active': reminderValue,
                    'note-btn--disable': page === 'recycle',
                    'reminder-header--disable': page === 'recycle',
                })}
            >
                <BiAlarm width={'18px'} height={'18px'} />
                {reminderValue && <span className={cx('reminder-date')}>{reminderValue}</span>}
            </div>
        </TippyHeadLess>
    );
}

export default TopbarReminder;
