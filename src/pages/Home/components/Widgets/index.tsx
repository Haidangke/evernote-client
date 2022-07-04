import { memo } from 'react';

import NoteList from './NoteList';
import Scratch from './Scratch';
import styles from './Widgets.module.scss';

function Widgets() {
    return (
        <div className={styles.wrapper}>
            <NoteList />
            <Scratch />
        </div>
    );
}

export default memo(Widgets);
