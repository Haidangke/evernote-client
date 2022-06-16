import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { ArrowDownIcon } from 'assets/icons';

import { CheckIcon } from 'assets/icons/toolbar';
import { toolbarConfig } from 'config';
import { isBlockActive, toggleBlock } from '../../utils/block';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function FontSize({ editor }: any) {
    const isFontSizeTextDefault = useMemo(
        () => toolbarConfig.fontSize.filter((item) => isBlockActive(editor, item, 'fontSize'))[0],
        [editor]
    );

    const FontSizeTextDefault = isFontSizeTextDefault || '16';
    return (
        <DropdownButton
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {toolbarConfig.fontSize.map((item) => (
                        <button
                            key={item}
                            className={cx('dropdown-align')}
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleBlock(editor, item);
                            }}
                        >
                            <div className={cx('dropdown-align-check')}>
                                {(isBlockActive(editor, item, 'fontSize') ||
                                    (!isFontSizeTextDefault && item === '16px')) && <CheckIcon />}
                            </div>
                            {item.replace('px', '')}
                        </button>
                    ))}
                </div>
            )}
        >
            <span>{FontSizeTextDefault.replace('px', '')}</span>
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default FontSize;
