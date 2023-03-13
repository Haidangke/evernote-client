import classNames from 'classnames/bind';

import SlateFooterStatus from './SlateFooterStatus';
import SlateFooterTag from './FooterTag';

import styles from './SlateFooter.module.scss';
const cx = classNames.bind(styles);

function SlateFooter() {
    return (
        <div className={cx('wrapper')}>
            <SlateFooterTag />
            <SlateFooterStatus />
        </div>
    );
}

export default SlateFooter;
