import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useInline } from 'draft-js-rte';

import { fontFamilies } from 'config/toolbar';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

interface FontFamilyItemProps {
    item: {
        name: string;
        value: string;
    };
    setCurFontFamily: any;
}

function FontFamily() {
    const [curFontFamily, setCurFontFamily] = useState('Sans Serif');
    return (
        <DropdownButton
            minWidth='68px'
            value={curFontFamily}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {fontFamilies.map((item) => (
                        <FontFamilyItem key={item.value} item={item} setCurFontFamily={setCurFontFamily} />
                    ))}
                </div>
            )}
        />
    );
}

function FontFamilyItem({ item, setCurFontFamily }: FontFamilyItemProps) {
    const { selected, onClick } = useInline('FONT_FAMILY_' + item.value);

    useEffect(() => {
        if (selected) {
            setCurFontFamily(item.name);
        }
    }, [item.name, selected, setCurFontFamily]);

    return (
        <button
            className={cx('dropdown-fontFamily', {
                'dropdown-wrapper__active': selected,
            })}
            style={{ fontFamily: item.value }}
            key={item.value}
            onClick={onClick}
        >
            {item.name}
        </button>
    );
}

export default FontFamily;
