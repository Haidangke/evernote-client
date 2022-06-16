import { useState } from 'react';
import classNames from 'classnames/bind';

import { ArrowDownIcon } from '~/assets/icons';
import { toolbarConfig } from '~/config';
import { toggleBlock } from '../../utils/block';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';

const cx = classNames.bind(styles);

const Heading = ({ editor }: any) => {
    const [heading, setHeading] = useState('Văn bản thường');
    return (
        <DropdownButton
            value={heading}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {toolbarConfig.heading.map((item) => (
                        <button
                            className={cx('dropdown-heading', {
                                'dropdown-wrapper__active': heading === item.name,
                            })}
                            style={{ fontSize: item.size }}
                            key={item.value}
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleBlock(editor, item.value);
                                setHeading(item.name);
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
};

export default Heading;
