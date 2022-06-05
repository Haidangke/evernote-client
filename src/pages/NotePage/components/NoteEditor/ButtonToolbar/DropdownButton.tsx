import { useEffect, useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Popper from '~/components/Popper';
import styles from './ButtonToolbar.module.scss';
import useWindowSize from '~/hooks/useWindowSize';
import { checkOverflow } from '.';

interface DropDown {
    children: any;
    className?: string;
    dropdown: any;
    content?: string;
    visibleProp?: boolean;
    setVisibleProp?: any;
    value?: string;
    width?: string;
}

const cx = classNames.bind(styles);

function DropDownButton({
    value,
    children,
    className,
    dropdown,
    content,
    visibleProp,
    setVisibleProp,
}: DropDown) {
    const [visibleState, setVisibleState] = useState(false);

    const visible = setVisibleProp ? visibleProp : visibleState;
    const setVisible = setVisibleProp || setVisibleState;
    const Dropdown = dropdown;

    const [width] = useWindowSize();
    const [overflowActive, setOverflowActive] = useState<boolean>(true);
    const overflowingRef = useRef(null);

    useEffect(() => {
        setOverflowActive(checkOverflow(overflowingRef.current, width));
    }, [width]);

    return overflowActive ? (
        <div className={cx('dropdown-wrapper')}>
            <TippyHeadless
                content={content}
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

export default DropDownButton;
