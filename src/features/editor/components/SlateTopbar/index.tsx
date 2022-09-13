import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import NoteMore from 'features/note/components/NoteMore';
import { TippyButton } from 'components/Tippy';
import { FullSizeIcon, NoteMainIcon, NoteToIcon } from 'assets/icons';

import styles from './Topbar.module.scss';
const cx = classNames.bind(styles);

function SlateTopbar() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleExpandEditor = () => {
        const expand = JSON.parse(searchParams.get('fs') || 'false');

        if (expand) {
            searchParams.delete('fs');
        } else {
            searchParams.set('fs', 'true');
        }
        setSearchParams(searchParams);
    };

    return (
        <div className={cx('topbar')}>
            <div className={cx('left')}>
                <div className={cx('icon')} onClick={handleExpandEditor}>
                    <TippyButton content='Mở rộng ghi chú' placement='bottom'>
                        <FullSizeIcon />
                    </TippyButton>
                </div>
                <div className={cx('line')}></div>
                <div className={cx('note')}>
                    <TippyButton
                        className={cx('note-btn')}
                        content='Di chuyển ghi chú'
                        placement='bottom'
                        height='100%'
                    >
                        <>
                            <NoteMainIcon />
                            <span>Sổ tay mới</span>
                        </>
                    </TippyButton>

                    <TippyButton
                        className={cx('note-btn__move')}
                        content='Di chuyển ghi chú'
                        placement='bottom'
                    >
                        <NoteToIcon />
                    </TippyButton>
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('info-auth')}>Chỉ bạn</div>
                <div className={cx('share-btn')}>Chia sẻ</div>
                <div className={cx('other-btn')}>
                    <NoteMore />
                </div>
            </div>
        </div>
    );
}

export default SlateTopbar;
