import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { useSlate } from 'slate-react';

import { CheckIcon } from 'components/Icons';
import { fontSizeConfig } from 'config/toolbar';
import { getMarks, isMarkActive, toggleMark } from '../../utils/mark';
import { DropdownButton } from '../SlateButton';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function FontSize() {
    const editor = useSlate();
    const marks = getMarks(editor);

    const fontSizeCur = useMemo(() => marks.find((mark) => fontSizeConfig.includes(mark)), [marks]);

    const fontSizeDefault = fontSizeCur || '16';
    return (
        <DropdownButton
            minWidth='24px'
            value={fontSizeDefault.replace('px', '')}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {fontSizeConfig.map((item) => (
                        <button
                            key={item}
                            className={cx('dropdown-align')}
                            onClick={(event: any) => {
                                event.preventDefault();
                                if (item === fontSizeCur) return;

                                toggleMark(editor, item);
                            }}
                        >
                            <div className={cx('dropdown-align-check')}>
                                {(isMarkActive(editor, item) ||
                                    (!fontSizeCur && item === '16px')) && <CheckIcon />}
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
