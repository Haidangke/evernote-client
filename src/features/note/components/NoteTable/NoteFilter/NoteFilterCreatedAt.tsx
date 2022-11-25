import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';

import { useAppSelector } from 'app/hooks';
import { ArrowDownIcon, CreatedAtFilterIcon } from 'components/Icons';
import { TippyHeadLessOneWay } from 'components/Tippy';
import NoteFilterCalendar from './NoteFilterCalendar';

import styles from './NoteFilter.module.scss';
const cx = classNames.bind(styles);

interface NoteFilterCreatedAtProps {
    fowardRef: any;
}

function NoteFilterCreatedAt({ fowardRef }: NoteFilterCreatedAtProps) {
    const [visible, setVisible] = useState(false);

    const { createdAt } = useAppSelector((state) => state.note.filter);

    return (
        <div className={styles.item}>
            <div className={styles.left}>
                <CreatedAtFilterIcon className={styles.itemIcon} />
                <div className={styles.name}>Ngày tạo</div>
            </div>
            <div className={styles.right}>
                <TippyHeadLessOneWay
                    placement='bottom-start'
                    dropdown={
                        <div ref={fowardRef}>
                            <NoteFilterCalendar status='createdAt' setVisible={setVisible} />
                        </div>
                    }
                    visible={visible}
                    setVisible={setVisible}
                >
                    <div className={styles.input}>
                        {createdAt ? (
                            <div className={styles.menu}>
                                <div className={cx('menu-date')}>{createdAt.title}</div>
                            </div>
                        ) : (
                            <input type='text' placeholder='Ngày tháng...' />
                        )}

                        <ArrowDownIcon />
                    </div>
                </TippyHeadLessOneWay>

                {/* <DeleteIcon /> */}
            </div>
        </div>
    );
}

export default forwardRef((props, ref) => <NoteFilterCreatedAt {...props} fowardRef={ref} />);
