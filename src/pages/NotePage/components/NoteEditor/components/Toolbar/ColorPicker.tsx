import classNames from 'classnames/bind';

import { ArrowDownIcon } from '~/assets/icons';
import { ColorPickerIcon } from '~/assets/icons/toolbar';
import { toolbarConfig } from '~/config';
import { isBlockActive, toggleBlock } from '../../utils/block';
import { DropdownButton } from '../Button';

import colorPicker from '~/assets/images/color-picker.png';
import styles from './Toolbar.module.scss';
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
                                'color-btn-light': item === 'rgb(255, 255, 255)',
                                'color-btn-active': isBlockActive(editor, item, 'color'),
                            })}
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleBlock(editor, item);
                            }}
                        >
                            <span style={{ backgroundColor: item }}></span>
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
