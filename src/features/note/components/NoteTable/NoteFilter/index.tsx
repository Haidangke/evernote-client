import { useState } from 'react';
import { TippyHeadLessOneWay } from 'components/Tippy';
import { ArrowDownIcon, DeleteIcon, FilterIcon } from 'assets/icons';

import styles from './NoteFilter.module.scss';

function NoteFilter() {
    const [visible, setVisible] = useState(false);

    return (
        <TippyHeadLessOneWay
            placement='bottom-start'
            visible={visible}
            setVisible={setVisible}
            dropdown={
                <div className='wrapper'>
                    <div className='header'>
                        <div className='title'></div>
                        <div className='delete'></div>
                    </div>
                    <div className='list'>
                        <div className='item'>
                            <div className='itemIcon'></div>
                            <div className='name'></div>
                            <div className='input'>
                                <div className='menu'></div>
                                <input type='text' />
                                <ArrowDownIcon />
                            </div>
                            <DeleteIcon />
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
