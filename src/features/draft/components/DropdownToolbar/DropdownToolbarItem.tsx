import { useAppSelector } from 'app/hooks';
import { limits } from 'config/toolbar';

import styles from './DropdownToolbar.module.scss';

interface DropdownToolbarItemProps {
    icon: any;
    name: string;
    format: string;
}

function DropdownToolbarItem({ icon, format, name }: DropdownToolbarItemProps) {
    const { width } = useAppSelector((state) => state.draft);
    const Icon = icon;
    const check = limits[format] + 60 < width;

    if (check) return null;
    return (
        <div className={styles.item}>
            <span className={styles.icon}>
                <Icon width={24} height={24} />
            </span>
            <span className={styles.name}>{name}</span>
        </div>
    );
}

export default DropdownToolbarItem;
