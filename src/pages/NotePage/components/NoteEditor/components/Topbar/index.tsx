import classNames from 'classnames/bind';
import ButtonTippy from '~/components/ButtonTippy';
import { FullSizeIcon, NoteMainIcon, NoteToIcon, OtherIcon } from '~/assets/icons';
import styles from './Topbar.module.scss';

const cx = classNames.bind(styles);

function Topbar() {
    return (
        <div className={cx('topbar')}>
            <div className={cx('left')}>
                <div className={cx('icon')}>
                    <ButtonTippy content='Mở rộng ghi chú' placement='bottom'>
                        <FullSizeIcon />
                    </ButtonTippy>
                </div>
                <div className={cx('line')}></div>
                <div className={cx('note')}>
                    <ButtonTippy
                        className={cx('note-btn')}
                        content='Di chuyển ghi chú'
                        placement='bottom'
                        height='100%'
                    >
                        <>
                            <NoteMainIcon />
                            <span>Sổ tay mới</span>
                        </>
                    </ButtonTippy>

                    <ButtonTippy
                        className={cx('note-btn__move')}
                        content='Di chuyển ghi chú'
                        placement='bottom'
                    >
                        <NoteToIcon />
                    </ButtonTippy>
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('info-auth')}>Chỉ bạn</div>
                <div className={cx('share-btn')}>Chia sẻ</div>
                <div className={cx('other-btn')}>
                    <ButtonTippy content='Thao tác khác' placement='bottom'>
                        <OtherIcon />
                    </ButtonTippy>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
