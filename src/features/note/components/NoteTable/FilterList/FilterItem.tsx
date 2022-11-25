import { TimesIcon } from 'components/Icons';
import { TypeFilter } from '.';

import styles from './FilterList.module.scss';

interface FilterItemProps {
    _id?: string;
    name: string;
    Icon: any;
    onClear: (type: TypeFilter, _id?: string) => void;
    type: TypeFilter;
}

function FilterItem({ Icon, onClear, name, _id, type }: FilterItemProps) {
    return (
        <div className={styles.item}>
            <div className={styles.icon}>
                <Icon />
            </div>
            <div className={styles.name}>{name}</div>
            <div onClick={() => onClear(type, _id)} className={styles.clear}>
                <TimesIcon />
            </div>
        </div>
    );
}

export default FilterItem;
