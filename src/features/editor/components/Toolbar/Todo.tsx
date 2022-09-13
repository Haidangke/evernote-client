import { BsCheck } from 'react-icons/bs';

import { HandleButton } from '../SlateButton';
import styles from './Toolbar.module.scss';

function Todo() {
    return (
        <HandleButton handle={() => console.log('Handle')} content='Nhiệm vụ'>
            <div className={styles.todo}>
                <BsCheck fontSize={16} style={{ fill: '#fff' }} color='#fff' />
            </div>
        </HandleButton>
    );
}

export default Todo;
