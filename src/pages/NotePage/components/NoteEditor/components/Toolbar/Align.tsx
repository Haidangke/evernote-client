import { useMemo } from 'react';
import classNames from 'classnames/bind';

import { ArrowDownIcon } from '~/components/Icon';
import { AlignIcon, CheckIcon } from '~/components/Icon/Toolbar';
import { toolbarConfig } from '~/config';
import { isBlockActive, toggleBlock } from '../../utils/block';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

function Align({ editor }: any) {
    const isAlignIconDefault = useMemo(
        () =>
            toolbarConfig.align.filter((item) => isBlockActive(editor, item.value, 'align'))[0]
                ?.icon,
        [editor]
    );
    const AlignIconDefault = isAlignIconDefault || AlignIcon;
    return (
        <DropdownButton
            formats={['left', 'center', 'right']}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {toolbarConfig.align.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                className={cx('dropdown-align')}
                                key={item.value}
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    toggleBlock(editor, item.value);
                                }}
                            >
                                <div className={cx('dropdown-align-check')}>
                                    {(isBlockActive(editor, item.value, 'align') ||
                                        (!isAlignIconDefault && item.value === 'left')) && (
                                        <CheckIcon />
                                    )}
                                </div>

                                <Icon className={cx('dropdown-align-icon')} />
                            </button>
                        );
                    })}
                </div>
            )}
        >
            <AlignIconDefault />
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default Align;
