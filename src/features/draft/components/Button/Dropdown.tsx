import TippyHeadLess from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { ArrowDownIcon } from 'components/Icons';
import Popper from 'components/Popper';
import { WrapperButton } from '.';

import styles from './Button.module.scss';

interface DropDownProps {
    className?: string;
    dropdown: any;
    value?: any;
    minWidth?: string;
    format?: string;
}

const cx = classNames.bind(styles);

function DropDown({ value, className, dropdown, minWidth, format }: DropDownProps) {
    const [visible, setVisible] = useState(false);
    const Dropdown = dropdown;

    return (
        <WrapperButton format={format}>
            <div className={cx('dropdown-wrapper')}>
                <TippyHeadLess
                    placement='bottom-start'
                    interactive
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                    render={(attrs) => (
                        <div onClick={() => setVisible(false)}>
                            <Popper>
                                <Dropdown {...attrs} />
                            </Popper>
                        </div>
                    )}
                >
                    <button
                        onClick={() => setVisible(!visible)}
                        className={`${cx('dropdown-btn', 'btn')}  ${className || ''}`}
                    >
                        <span style={{ minWidth }}>{value}</span>
                        <ArrowDownIcon width={10} height={24} />
                    </button>
                </TippyHeadLess>
            </div>
        </WrapperButton>
    );
}

export default DropDown;
