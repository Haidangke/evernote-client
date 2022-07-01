import classNames from 'classnames/bind';

import { ArrowDownIcon } from 'assets/icons';
import { ColorPickerIcon } from 'assets/icons/toolbar';
import { BiCheck } from 'react-icons/bi';
import { toolbarConfig } from 'config';
import { DropdownButton } from '../Button';

import colorPicker from 'assets/images/cl_pick.png';
import styles from './Toolbar.module.scss';
import { isMarkActive, toggleMark } from '../../utils/mark';
const cx = classNames.bind(styles);

function ColorPicker({ editor }: any) {
    return (
        <DropdownButton
            dropdown={() => (
                <div className={cx('color-wrapper')}>
                    {toolbarConfig.color.map((item) => (
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
        >
            <div className={cx('color-picker')}>
                <img src={colorPicker} alt='color picker' />
                <ColorPickerIcon />
            </div>

            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default ColorPicker;
