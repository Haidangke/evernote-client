import { RichUtils } from 'draft-js';
import classNames from 'classnames/bind';

import { headings } from 'config/toolbar';
import { DropdownButton } from '../Button';
import { DraftToolProps } from '.';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function Heading({ onChange, editorState }: DraftToolProps) {
    const currentBlockStyle = RichUtils.getCurrentBlockType(editorState);
    const heading =
        headings.find((item) => item.value === currentBlockStyle)?.name || 'Văn bản thường';

    return (
        <DropdownButton
            value={heading}
            minWidth='120px'
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {headings.map((item) => (
                        <button
                            key={item.value}
                            className={cx('dropdown-heading', {
                                'dropdown-wrapper__active': currentBlockStyle === item.value,
                            })}
                            style={{ fontSize: item.size }}
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
