import { useSlate } from 'slate-react';
import classNames from 'classnames/bind';

import Popper from 'components/Popper';
import { DropdownButton } from '../../Button';
import { toggleMark } from '../../../utils/mark';

import { ArrowDownIcon } from 'assets/icons';
import { CodeIcon, InsertIcon, TodoIcon } from 'assets/icons/toolbar';
import styles from './Insert.module.scss';

const cx = classNames.bind(styles);

function Insert() {
    const editor = useSlate();

    return (
        <DropdownButton
            dropdown={() => (
                <Popper>
                    <div className={cx('insert')}>
                        <div className={cx('insert-item')}>
                            <TodoIcon className={cx('insert-icon')} />
                            <div className={cx('insert-name')}>
                                <span>Nhiệm vụ</span>
                            </div>
                        </div>

                        <div className={cx('insert-item')}>
                            <TodoIcon className={cx('insert-icon')} />
                            <div className={cx('insert-name')}>
                                <span>Nhiệm vụ</span>
                            </div>
                        </div>

                        <div
                            onClick={(event: any) => {
                                event.preventDefault();
                                toggleMark(editor, 'code');
                            }}
                            className={cx('insert-item')}
                        >
                            <CodeIcon className={cx('insert-icon')} />
                            <div className={cx('insert-name')}>
                                <span>Khối mã</span>
                            </div>
                        </div>
                    </div>
                </Popper>
            )}
        >
            <InsertIcon className={cx('icon')} />
            <span>Chèn</span>
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default Insert;
