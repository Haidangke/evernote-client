import ReactCalendar from 'react-calendar';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.scss';
import './Calendar.scss';

interface CalendarProps {
    value: Date;
    onChange: any;
    maxDate: any;
    [key: string]: any;
}

function Calendar({ value, onChange, maxDate, ...props }: CalendarProps) {
    return (
        <ReactCalendar
            tileClassName={styles.tile}
            className={styles.calendar}
            prev2Label={null}
            next2Label={null}
            nextLabel={<BsArrowRight size={18} />}
            prevLabel={<BsArrowLeft size={18} />}
            //state
            selectRange={true}
            onChange={onChange}
            value={value}
            maxDate={maxDate}
            {...props}
        />
    );
}

export default Calendar;
