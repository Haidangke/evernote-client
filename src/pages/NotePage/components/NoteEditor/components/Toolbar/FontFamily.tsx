import { useMemo } from 'react';
import classNames from 'classnames/bind';

import { ArrowDownIcon } from 'assets/icons';
import { toolbarConfig } from 'config';
import { DropdownButton } from '../Button';

import { getMarks, toggleMark } from '../../utils/mark';
import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function FontFamily({ editor }: any) {
    const marks = getMarks(editor);

    const isFontFamily = useMemo(
        () =>
            marks.find((mark) => toolbarConfig.fontFamily.map((font) => font.value).includes(mark)),
        [marks]
    );

    const fontFamily =
        toolbarConfig.fontFamily.find((font) => font.value === isFontFamily)?.name || 'Sans Serif';
    return (
        <DropdownButton
            value={fontFamily}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {toolbarConfig.fontFamily.map((item) => (
                        <button
                            className={cx('dropdown-fontFamily', {
                                'dropdown-wrapper__active': fontFamily === item.name,
                            })}
                            style={{ fontFamily: item.value }}
                            key={item.value}
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleMark(editor, item.value);
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        >
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default FontFamily;
