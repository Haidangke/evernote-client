import classNames from 'classnames/bind';

import FooterStatus from './FooterStatus';
import FooterTag from './FooterTag';

import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <FooterTag />
            <FooterStatus />
        </div>
    );
}

export default Footer;
