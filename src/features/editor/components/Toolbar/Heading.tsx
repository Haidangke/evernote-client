import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { useSlate } from 'slate-react';

import { getMarks, toggleMark } from 'features/editor/utils/mark';
import { DropdownButton } from '../SlateButton';
import { toolbarConfig } from 'config';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function Heading() {
    const editor = useSlate();
    const [heading, setHeading] = useState('Văn bản thường');
    const marks = getMarks(editor);

    const fontSizeCur = useMemo(
        () => marks.find((mark) => toolbarConfig.fontSize.includes(mark)),
        [marks]
    );
    return (
        <DropdownButton
            value={heading}
            minWidth='140px'
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {toolbarConfig.heading.map((item) => (
                        <button
                            className={cx('dropdown-heading', {
                                'dropdown-wrapper__active': heading === item.name,
                            })}
                            style={{ fontSize: item.value }}
                            key={item.value}
                            onClick={(event: any) => {
                                if (fontSizeCur === item.value) return;
                                event.preventDefault();
                                toggleMark(editor, item.value);
                                setHeading(item.name);
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

export default Heading;
