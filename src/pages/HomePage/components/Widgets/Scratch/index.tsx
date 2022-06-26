import { useAppSelector } from 'app/hooks';
import { DebounceInput } from 'react-debounce-input';
import Element from '../../Element';
import styles from './Scratch.module.scss';

function Scratch() {
    const scratch = useAppSelector((state) => state.auth.user?.scratch);
    return (
        <Element menu={[]} className={styles.wrapper} title={<span>Giấy nháp</span>}>
            <DebounceInput
                debounceTimeout={1000}
                type='text'
                placeholder='Tiêu đề'
                className={styles.input}
                value={scratch}
                onChange={(e) => {
                    const title = e.target.value;
                    console.log(title);
                }}
            />
        </Element>
    );
}

export default Scratch;
