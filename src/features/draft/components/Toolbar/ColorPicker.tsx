import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useInline } from 'draft-js-rte';

import { ColorPickerIcon } from 'components/Icons';
import { colors } from 'config/toolbar';
import useCheckOverflow from 'features/editor/hooks/useCheckOverflow';
import { DropdownButton } from '../Button';
import { limitBtns } from 'config/toolbar';

import colorPicker from 'assets/images/cl_pick.png';
import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function ColorPicker() {
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const limit = limitBtns.find((item) => item.format === 'color')?.limit || 0;
    const check = useCheckOverflow(limit);

    useEffect(() => {
        if (check !== undefined) {
            setIsOverflow(!check);
        }
    }, [check]);
    return !isOverflow ? (
        <DropdownButton
            value={
                <div className={cx('color-picker')}>
                    <img src={colorPicker} alt='color picker' />
                    <ColorPickerIcon />
                </div>
            }
            dropdown={() => (
                <div className={cx('color-wrapper')}>
                    {colors.map((item) => (
                        <ColorItemButton key={item} item={item} />
                    ))}
                </div>
            )}
        />
    ) : (
        <></>
    );
}

function ColorItemButton({ item }: { item: string }) {
    const { selected, onClick } = useInline('COLOR_' + item);
    return (
        <button
            className={cx('color-btn', {
                'color-btn__light': item === 'rgb(255, 255, 255)',
            })}
            onClick={onClick}
        >
            <span style={{ backgroundColor: item }}>
                {selected && <BiCheck color={item === 'rgb(255, 255, 255)' ? 'black' : 'white'} />}
            </span>
        </button>
    );
}

export default ColorPicker;
