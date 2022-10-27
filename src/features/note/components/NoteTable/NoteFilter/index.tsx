import { useRef, useState } from 'react';
import { TippyHeadLessOneWay } from 'components/Tippy';
import { ArrowDownIcon, DeleteIcon, FilterIcon, TagIcon } from 'components/Icons';

import styles from './NoteFilter.module.scss';
import NoteFilterTag from './NoteFilterTag';
import useOnClickOutside from 'hooks/useOnclickOutside';

function NoteFilter() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, (event: any) => {
        console.log(event.target);
    });

    return (
        <TippyHeadLessOneWay
            disableClickOutside={true}
            placement='bottom-start'
            visible={visible}
            setVisible={setVisible}
            dropdown={
                <div ref={ref} className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.title}>Thêm bộ lọc</div>
                        <div className={styles.delete}>Xóa tất cả</div>
                    </div>
                    <div className={styles.list}>
                        <NoteFilterTag />

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <TagIcon className={styles.itemIcon} />
                                <div className={styles.name}>Thẻ</div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.input}>
                                    {/* <div className='menu'></div> */}
                                    <input type='text' placeholder='Chọn...' />
                                    <ArrowDownIcon />
                                </div>
                                {/* <DeleteIcon /> */}
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <TagIcon className={styles.itemIcon} />
                                <div className={styles.name}>Thẻ</div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.input}>
                                    {/* <div className='menu'></div> */}
                                    <input type='text' placeholder='Chọn...' />
                                    <ArrowDownIcon />
                                </div>
                                {/* <DeleteIcon /> */}
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <TagIcon className={styles.itemIcon} />
                                <div className={styles.name}>Thẻ</div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.input}>
                                    {/* <div className='menu'></div> */}
                                    <input type='text' placeholder='Chọn...' />
                                    <ArrowDownIcon />
                                </div>
                                {/* <DeleteIcon /> */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <FilterIcon className={styles.icon} />
        </TippyHeadLessOneWay>
    );
}

export default NoteFilter;
