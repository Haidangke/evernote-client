import classNames from 'classnames/bind';
import { useInline } from 'draft-js-rte';
import { BiCheck } from 'react-icons/bi';

import { ColorPickerIcon } from 'components/Icons';
import { colors } from 'config/toolbar';
import { DropdownButton } from '../Button';

import colorPicker from 'assets/images/cl_pick.png';
import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function ColorPicker() {
    return (
        <DropdownButton
            format='COLOR'
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
