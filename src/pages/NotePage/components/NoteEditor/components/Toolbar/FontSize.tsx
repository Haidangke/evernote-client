import { useMemo } from 'react';
import classNames from 'classnames/bind';

import { CheckIcon } from 'assets/icons/toolbar';
import { toolbarConfig } from 'config';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';
import { getMarks, isMarkActive, toggleMark } from '../../utils/mark';
const cx = classNames.bind(styles);

function FontSize({ editor }: any) {
    const marks = getMarks(editor);

    const isFontSizeTextDefault = useMemo(
        () => marks.find((mark) => toolbarConfig.fontSize.includes(mark)),
        [marks]
    );

    const FontSizeTextDefault = isFontSizeTextDefault || '16';
    return (
        <DropdownButton
            minWidth='21px'
            value={FontSizeTextDefault.replace('px', '')}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {toolbarConfig.fontSize.map((item) => (
                        <button
                            key={item}
                            className={cx('dropdown-align')}
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleMark(editor, item);
                            }}
                        >
                            <div className={cx('dropdown-align-check')}>
                                {(isMarkActive(editor, item) ||
                                    (!isFontSizeTextDefault && item === '16px')) && <CheckIcon />}
                            </div>
                            {item.replace('px', '')}
                        </button>
                    ))}
                </div>
            )}
        />
    );
}

export default FontSize;
