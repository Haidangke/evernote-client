import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { useSlate } from 'slate-react';

import { toolbarConfig } from 'config';
import { DropdownButton } from '../SlateButton';
import { getMarks, toggleMark } from '../../utils/mark';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function FontFamily() {
    const editor = useSlate();
    const marks = getMarks(editor);

    const fontFamilyCur = useMemo(
        () =>
            marks.find((mark) => toolbarConfig.fontFamily.map((font) => font.value).includes(mark)),
        [marks]
    );

    const fontFamily =
        toolbarConfig.fontFamily.find((font) => font.value === fontFamilyCur)?.name || 'Sans Serif';
    return (
        <DropdownButton
            minWidth='68px'
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
                                if (item.value === fontFamilyCur) return;
                                event.preventDefault();
                                toggleMark(editor, item.value);
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        />
    );
}

export default FontFamily;
