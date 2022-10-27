import { useAppSelector } from 'app/hooks';
import { ArrowDownIcon, TagIcon } from 'components/Icons';
import classNames from 'classnames/bind';
import { TippyHeadLessOneWay } from 'components/Tippy';
import { useState } from 'react';
import styles from './NoteFilter.module.scss';

const cx = classNames.bind(styles);

function NoteFilterTag() {
    const [visible, setVisible] = useState(false);
    const listTag = useAppSelector((state) => state.tag.listTag);
    return (
        <div className={styles.item}>
            <div className={styles.left}>
                <TagIcon className={styles.itemIcon} />
                <div className={styles.name}>Thẻ</div>
            </div>
            <div className={styles.right}>
                <TippyHeadLessOneWay
                    placement='bottom-start'
                    dropdown={
                        <div className={cx('dropdown-list')}>
                            {listTag.map((tag) => (
                                <div key={tag._id} className={cx('dropdown-item')}>
                                    <input type='checkbox' name='' id='' />
                                    <span>{tag.name}</span>
                                </div>
                            ))}
                        </div>
                    }
                    visible={visible}
                    setVisible={setVisible}
                >
                    <div className={styles.input}>
                        {/* <div className='menu'></div> */}
                        <input type='text' placeholder='Chọn...' />
                        <ArrowDownIcon />
                    </div>
                </TippyHeadLessOneWay>

                {/* <DeleteIcon /> */}
            </div>
        </div>
    );
}

export default NoteFilterTag;
