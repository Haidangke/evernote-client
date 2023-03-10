import classNames from 'classnames/bind';
import { EditorState, RichUtils } from 'draft-js';

import { AlignLeftIcon, CheckIcon } from 'components/Icons';
import { aligns } from 'config/toolbar';

import { DropdownButton } from '../Button';
import styles from './Toolbar.module.scss';

const cx = classNames.bind(styles);

interface AlignProps {
    editorState: EditorState;
    onChange: any;
}

function Align({ editorState, onChange }: AlignProps) {
    const blockType = RichUtils.getCurrentBlockType(editorState);

    const AlignIcon = aligns.find((align) => align.value === blockType)?.icon || AlignLeftIcon;

    return (
        <DropdownButton
            value={<AlignIcon />}
            formats={['left', 'center', 'right']}
            format='align'
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {aligns.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.value}
                                className={cx('dropdown-align')}
                                onClick={() =>
                                    onChange(RichUtils.toggleBlockType(editorState, item.value))
                                }
                            >
                                <div className={cx('dropdown-align-check')}>
                                    {blockType === item.value && <CheckIcon />}
                                </div>

                                <Icon className={cx('dropdown-align-icon')} />
                            </button>
                        );
                    })}
                </div>
            )}
        />
    );
}

export default Align;
