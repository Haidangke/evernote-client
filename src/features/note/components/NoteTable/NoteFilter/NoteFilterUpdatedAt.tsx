import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';

import { useAppSelector } from 'app/hooks';
import { ArrowDownIcon, UpdatedAtFilterIcon } from 'components/Icons';
import { TippyHeadLessOneWay } from 'components/Tippy';
import NoteFilterCalendar from './NoteFilterCalendar';

import styles from './NoteFilter.module.scss';
const cx = classNames.bind(styles);

interface NoteFilterUpdatedAtProps {
    fowardRef: any;
}

function NoteFilterUpdatedAt({ fowardRef }: NoteFilterUpdatedAtProps) {
    const [visible, setVisible] = useState(false);

    const { updatedAt } = useAppSelector((state) => state.note.filter);

    return (
        <div className={styles.item}>
            <div className={styles.left}>
                <UpdatedAtFilterIcon className={styles.itemIcon} />
                <div className={styles.name}>Ngày chỉnh sửa</div>
            </div>
            <div className={styles.right}>
                <TippyHeadLessOneWay
                    placement='bottom-start'
                    dropdown={
                        <div ref={fowardRef}>
                            <NoteFilterCalendar status='updatedAt' setVisible={setVisible} />
                        </div>
                    }
                    visible={visible}
                    setVisible={setVisible}
                >
                    <div className={styles.input}>
                        {updatedAt ? (
                            <div className={styles.menu}>
                                <div className={cx('menu-date')}>{updatedAt.title}</div>
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

export default forwardRef((props, ref) => <NoteFilterUpdatedAt {...props} fowardRef={ref} />);
