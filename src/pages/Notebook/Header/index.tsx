import { AddNotebookIcon, SortIcon } from 'assets/icons';
import styles from './Header.module.scss';

function Header() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>3 sổ tay</div>
            <div className={styles.right}>
                <div className={styles.new}>
                    <AddNotebookIcon className={styles.icon} />
                    <span>Sổ tay Mới</span>
                </div>

                <SortIcon />
            </div>
        </div>
    );
}

export default Header;
