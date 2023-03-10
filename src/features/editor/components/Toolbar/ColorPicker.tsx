import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { BiCheck } from 'react-icons/bi';

import { ColorPickerIcon } from 'components/Icons';
import { colors } from 'config/toolbar';
import { DropdownButton } from '../SlateButton';
import { isMarkActive, toggleMark } from '../../utils/mark';

import colorPicker from 'assets/images/cl_pick.png';
import { limitBtns } from 'config/toolbar';
import useCheckOverflow from '../../hooks/useCheckOverflow';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function ColorPicker({ editor }: any) {
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
                        <button
                            key={item}
                            className={cx('color-btn', {
                                'color-btn__light': item === 'rgb(255, 255, 255)',
                            })}
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleMark(editor, item);
                            }}
                        >
                            <span style={{ backgroundColor: item }}>
                                {isMarkActive(editor, item) && (
                                    <BiCheck
                                        color={item === 'rgb(255, 255, 255)' ? 'black' : 'white'}
                                    />
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        />
    ) : (
        <></>
    );
}

export default ColorPicker;
