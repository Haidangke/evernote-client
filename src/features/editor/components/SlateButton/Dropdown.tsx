import { useEffect, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Popper from 'components/Popper';
import { useAppDispatch } from 'app/hooks';
import { editorActions } from 'features/editor/editorSlice';
import { ArrowDownIcon } from 'assets/icons';
import { overflowToolbar } from 'config/toolbar';
import useCheckOverflow from '../../hooks/useCheckOverflow';

import styles from './Button.module.scss';

interface DropDownProps {
    className?: string;
    dropdown: any;
    value?: any;
    isOther?: boolean;
    formats?: string[];
    minWidth?: string;
    format?: string;
}

const cx = classNames.bind(styles);

function DropDown({
    value,
    className,
    dropdown,
    isOther,
    formats,
    minWidth,
    format,
}: DropDownProps) {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);
    const Dropdown = dropdown;

    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const limit = overflowToolbar.find((item) => item.format === format)?.limit || 0;
    const check = useCheckOverflow(limit);
    useEffect(() => {
        if (check !== undefined && formats) {
            setIsOverflow(!check);
            for (let i = 0; i < formats.length; i++) {
                dispatch(editorActions.setOverflow({ format: formats[i], value: !check }));
            }
        }
    }, [check, dispatch, formats]);

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
                    onClick={() => setVisible(!visible)}
                    className={`${cx('dropdown-btn', 'btn')}  ${className || ''}`}
                >
                    <span style={{ minWidth }}>{value}</span>
                    <ArrowDownIcon width={10} height={24} />
                </button>
            </TippyHeadless>
        </div>
    ) : (
        <></>
    );
}

export default DropDown;
