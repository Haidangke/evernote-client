import { useState } from 'react';
import { useSlate } from 'slate-react';
import classNames from 'classnames/bind';

import { ArrowDownIcon } from '~/components/Icon';
import { CodeIcon, InsertIcon, TableIcon, TodoIcon } from '~/components/Icon/Toolbar';
import Popper from '~/components/Popper';
import { DropdownButton } from '../ButtonToolbar';
import { toggleMark } from '../ButtonToolbar/MarkButton';
import { toggleBlock } from '../ButtonToolbar/BlockButton';

import styles from './Insert.module.scss';
import { Transforms } from 'slate';
const cx = classNames.bind(styles);

function InsertBtn() {
    const [visible, setVisible] = useState(false);
    const editor = useSlate();
    return (
        <DropdownButton
            visibleProp={visible}
            setVisibleProp={setVisible}
            className={cx('insert-btn')}
            content='content'
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
                            <TableIcon className={cx('insert-icon')} />
                            <div
                                onClick={(event: any) => {
                                    setVisible(false);
                                    event.preventDefault();
                                }}
                                className={cx('insert-name')}
                            >
                                <span>Bảng</span>
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
                                setVisible(false);
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
            <InsertIcon />
            <span>Chèn</span>
            <ArrowDownIcon width={8} height={24} />
        </DropdownButton>
    );
}

export default InsertBtn;
