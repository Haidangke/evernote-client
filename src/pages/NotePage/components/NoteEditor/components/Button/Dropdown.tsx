import { useEffect, useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Popper from 'components/Popper';
import styles from './Button.module.scss';
import useWindowSize from 'hooks/useWindowSize';

import { useAppDispatch } from 'app/hooks';
import { toolbarActions } from 'app/slice/toolbarSlice';
import checkOverflow from '../../utils/checkOverflow';

interface DropDownProps {
    children: any;
    className?: string;
    dropdown: any;
    value?: string;
    isOther?: boolean;
    formats?: string[];
}

const cx = classNames.bind(styles);

function DropDown({ value, children, className, dropdown, isOther, formats }: DropDownProps) {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);

    const Dropdown = dropdown;

    const [width] = useWindowSize();
    const [isOverflow, setIsOverflow] = useState<boolean>(false);
    const overflowingRef = useRef(null);

    useEffect(() => {
        if (width === 0) return;
        const check = checkOverflow(overflowingRef.current, width);
        setIsOverflow(!check);
        if (!formats) return;

        for (let i = 0; i < formats.length; i++) {
            dispatch(toolbarActions.setOverflow({ format: formats[i], value: !check }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return !isOverflow || isOther ? (
        <div className={cx('dropdown-wrapper')}>
            <TippyHeadless
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
                    ref={overflowingRef}
                    onClick={() => setVisible(!visible)}
                    className={`${cx('dropdown-btn', 'btn')}  ${className || ''}`}
                >
                    <span>{value}</span>
                    {children}
                </button>
            </TippyHeadless>
        </div>
    ) : (
        <></>
    );
}

export default DropDown;