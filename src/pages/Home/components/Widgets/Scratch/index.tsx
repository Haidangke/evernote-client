import { useAppSelector } from 'app/hooks';
import { DebounceInput } from 'react-debounce-input';
import userService from 'services/userService';
import Element from '../../Element';
import styles from './Scratch.module.scss';

function Scratch() {
    const scratch = useAppSelector((state) => state.auth.user?.scratch);
    return (
        <Element menu={[]} className={styles.wrapper} title={<span>Giấy nháp</span>}>
            <DebounceInput
                debounceTimeout={700}
                element='textarea'
                placeholder='Tiêu đề'
                className={styles.input}
                value={scratch}
                onChange={(e) => {
                    const content = e.target.value;
                    // dispatch()
                    userService.updateScratch(content);
                }}
            />
        </Element>
    );
}

export default Scratch;
