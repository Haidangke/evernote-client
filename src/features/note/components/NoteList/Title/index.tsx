import { BookTitleIcon, NoteTitleIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import useLocationPage from 'hooks/useLocationPage';

import styles from './Title.module.scss';
const cx = classNames.bind(styles);

interface TitleProps {
    notebook?: string;
}

function Title({ notebook }: TitleProps) {
    const page = useLocationPage();

    return (
        <div className={cx('title')}>
            {['note', 'notes'].includes(page) && (
                <>
                    <NoteTitleIcon className={cx('icon-note')} />
                    <span>Ghi chú</span>
                </>
            )}
            {notebook && (
                <>
                    <BookTitleIcon className={cx('icon-book')} />
                    <span>{notebook}</span>
                </>
            )}
        </div>
    );
}

export default Title;
