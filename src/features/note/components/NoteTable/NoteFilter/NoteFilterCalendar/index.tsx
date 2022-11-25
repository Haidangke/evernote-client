import { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import classNames from 'classnames/bind';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import 'react-calendar/dist/Calendar.css';

import { noteActions } from 'features/note/noteSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { calendarConfig } from 'config/date';

import './NoteFilterCalendar.scss';
import styles from './NoteFilterCalendar.module.scss';
const cx = classNames.bind(styles);

interface NoteFilterCalendarProps {
    status: 'createdAt' | 'updatedAt';
    setVisible: Dispatch<SetStateAction<boolean>>;
}

function NoteFilterCalendar({ setVisible, status }: NoteFilterCalendarProps) {
    const dispatch = useAppDispatch();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const curDate = `${month}/${day}/${year}`;

    const filter = useAppSelector((state) => state.note.filter);
    const dateFilter = filter[status];

    const dateFilterTime: any = dateFilter?.date
        ? dateFilter?.date.map((item) => new Date(item))
        : null;

    const handleClickTimeline = (
        timeType: string,
        calendarValue: string,
        calendarTitle: string,
        timeLine?: number
    ) => {
        const filterDate: {
            date: Date[];
            title: string;
        } = {
            date: [new Date(), new Date()],
            title: calendarTitle,
        };

        if (calendarValue === dateFilter?.value) {
            setVisible(false);
            return;
        }
        //Time Type
        if (timeType === 'time') {
            if (calendarValue === 'today') {
                filterDate.date = [new Date(), new Date()];
            }
            if (calendarValue === 'yesterday') {
                const yesterday = new Date(Date.parse(`${month}/${day - 1}/${year} 00:00:00`));
                filterDate.date = [yesterday, yesterday];
            }
        } else if (timeType === 'timeLine') {
            if (!timeLine || !Number.isInteger(timeLine)) return;
            const curTimestamp = Date.parse(`${curDate} 00:00:00`);
            const timeLineTimestamp =
                Date.parse(`${curDate} 00:00:00`) - timeLine * 24 * 60 * 60 * 1000;

            const valueTimeline = [new Date(timeLineTimestamp), new Date(curTimestamp)];
            filterDate.date = valueTimeline;
        }

        const convertDate = filterDate.date.map((item) => item.toLocaleDateString());

        dispatch(
            noteActions.setFilter({
                ...filter,
                [status]: {
                    value: calendarValue,
                    date: convertDate,
                    title: filterDate.title,
                },
            })
        );

        setVisible(false);
    };

    const handleOnChangeCalendar = (dates: Date[], event: any) => {
        const convertDate = dates.map((item) => item.toLocaleDateString());
        const [dateStart, dateEnd] = convertDate;

        let title = '';
        let value = 'custom';

        if (dateStart === dateEnd) {
            const today = new Date().toLocaleDateString();
            const yesterday = new Date(date.setDate(date.getDate() - 1)).toLocaleDateString();

            if (dateStart === today) {
                title = 'Hôm nay';
                value = 'today';
            } else if (dateStart === yesterday) {
                title = 'Hôm qua';
                value = 'yesterday';
            } else {
                const [month, day, year] = dateStart.split('/');
                title = `${day} thg ${month}, ${year}`;
            }
        } else {
            const [month, day, year] = dateStart.split('/');
            const [monthEnd, dayEnd] = dateEnd.split('/');
            title = `${day} thg ${month} - ${dayEnd} thg ${monthEnd}, ${year}`;
        }

        dispatch(
            noteActions.setFilter({
                ...filter,
                [status]: {
                    value,
                    date: convertDate,
                    title,
                },
            })
        );

        setVisible(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.time}>
                {calendarConfig.map((calendar) => (
                    <div
                        key={calendar.value}
                        onClick={() =>
                            handleClickTimeline(
                                calendar.timeType,
                                calendar.value,
                                calendar.title,
                                calendar.timeLine
                            )
                        }
                        className={cx('time-line', {
                            'time-line--active': calendar.value === dateFilter?.value,
                        })}
                    >
                        {calendar.title}
                    </div>
                ))}
            </div>
            <Calendar
                tileClassName={styles.tile}
                className={styles.calendar}
                prev2Label={null}
                next2Label={null}
                nextLabel={<BsArrowRight size={18} />}
                prevLabel={<BsArrowLeft size={18} />}
                //state
                selectRange={true}
                onChange={handleOnChangeCalendar}
                value={dateFilterTime}
                maxDate={new Date()}
            />
        </div>
    );
}

export default NoteFilterCalendar;
