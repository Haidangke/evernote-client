import { useState } from 'react';
import classNames from 'classnames/bind';

import { ArrowDownIcon } from '~/assets/icons';
import { toolbarConfig } from '~/config';
import { toggleBlock } from '../../utils/block';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function FontFamily({ editor }: any) {
    const [fontFamily, setFontFamily] = useState('Sans Serif');
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
                                toggleBlock(editor, item.value);
                                setFontFamily(item.name);
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
