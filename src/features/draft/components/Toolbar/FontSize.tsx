import { useEffect, useState } from 'react';
import { useInline } from 'draft-js-rte';
import classNames from 'classnames/bind';

import { CheckIcon } from 'components/Icons';
import { fontSizes } from 'config/toolbar';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';

interface FontSizeItemProps {
    item: string;
    setValue: any;
}
const cx = classNames.bind(styles);

function FontSize() {
    const [value, setValue] = useState('16');
    return (
        <DropdownButton
            minWidth='24px'
            value={value}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {fontSizes.map((item) => (
                        <FontSizeItem key={item} item={item} setValue={setValue} />
                    ))}
                </div>
            )}
        />
    );
}

function FontSizeItem({ item, setValue }: FontSizeItemProps) {
    const { selected, onClick } = useInline('FONT_SIZE_' + item);
    useEffect(() => {
        if (selected) {
            setValue(item.replace('px', ''));
        }
    }, [item, selected, setValue]);

    return (
        <button className={cx('dropdown-align')} onClick={onClick}>
            <div className={cx('dropdown-align-check')}>{selected && <CheckIcon />}</div>
            {item.replace('px', '')}
        </button>
    );
}

export default FontSize;
