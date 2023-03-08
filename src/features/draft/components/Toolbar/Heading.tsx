import { RichUtils } from 'draft-js';
import classNames from 'classnames/bind';

import { headingConfig2 } from 'config/toolbar';
import { DropdownButton } from '../Button';
import { DraftToolbarProps } from '.';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function Heading({ onChange, editorState }: DraftToolbarProps) {
    const currentBlockStyle = RichUtils.getCurrentBlockType(editorState);
    console.log(currentBlockStyle);
    const heading =
        headingConfig2.find((item) => item.value === currentBlockStyle)?.name || 'Văn bản thường';

    return (
        <DropdownButton
            value={heading}
            minWidth='120px'
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {headingConfig2.map((item) => (
                        <button
                            className={cx('dropdown-heading', {
                                'dropdown-wrapper__active': currentBlockStyle === item.value,
                            })}
                            style={{ fontSize: item.size }}
                            key={item.value}
                            onClick={() => {
                                onChange(RichUtils.toggleBlockType(editorState, item.value));
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
