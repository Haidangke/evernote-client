import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TippyHeadLessOneWay } from 'components/Tippy';
import { noteActions } from 'features/note/noteSlice';
import {
    ArrowDownIcon,
    NotebookFilterIcon,
    NotebookIcon,
    NotebookDfIcon,
    NotebookDefaultFilterSelectIcon,
    NotebookFilterSelectIcon,
    CheckIcon,
    TimesIcon,
} from 'components/Icons';

import styles from './NoteFilter.module.scss';
const cx = classNames.bind(styles);

interface NoteFilterBookProps {
    fowardRef: any;
}

function NoteFilterBook({ fowardRef }: NoteFilterBookProps) {
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);

    const listNotebook = useAppSelector((state) => state.notebook.notebooks);
    const filter = useAppSelector((state) => state.note.filter);

    const notebookFilter = filter.notebook;
    const notebook = notebookFilter
        ? listNotebook.find((notebook) => notebook._id === notebookFilter)
        : null;

    const handleChoseNotebook = (id: string) => {
        dispatch(noteActions.setFilter({ ...filter, notebook: id }));
        setVisible(false);
    };

    const handleClearFilter = () => {
        dispatch(noteActions.setFilter({ ...filter, notebook: null }));
    };

    return (
        <div className={styles.item}>
            <div className={styles.left}>
                <NotebookFilterIcon className={styles.itemIcon} />
                <div className={styles.name}>Đặt trong</div>
            </div>
            <div className={styles.right}>
                <TippyHeadLessOneWay
                    placement='bottom-start'
                    dropdown={
                        <div ref={fowardRef} className={cx('dropdown-list')}>
                            {listNotebook.map((item) => {
                                const Icon = item.isDefault ? NotebookDfIcon : NotebookIcon;
                                return (
                                    <div
                                        onClick={() => handleChoseNotebook(item._id)}
                                        key={item._id}
                                        className={cx('dropdown-item', 'dropdown-item--book', {
                                            'dropdown-item--active': notebook?._id === item._id,
                                        })}
                                    >
                                        {notebook && notebook?._id === item._id && (
                                            <CheckIcon
                                                className={cx(
                                                    'dropdown-icon',
                                                    'dropdown-icon--check'
                                                )}
                                            />
                                        )}
                                        <Icon className={cx('dropdown-icon')} />
                                        <span>{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    }
                    visible={visible}
                    setVisible={setVisible}
                >
                    <div className={styles.input}>
                        {notebook ? (
                            <div className={styles.menu}>
                                <div className={cx('menu-book')}>
                                    {notebook.isDefault ? (
                                        <NotebookDefaultFilterSelectIcon />
                                    ) : (
                                        <NotebookFilterSelectIcon />
                                    )}
                                    <span>{notebook.name}</span>
                                </div>
                            </div>
                        ) : (
                            <input type='text' placeholder='Sổ tay...' />
                        )}

                        <ArrowDownIcon />
                    </div>
                </TippyHeadLessOneWay>

                {notebook && (
                    <TimesIcon onClick={handleClearFilter} className={cx('delete-icon')} />
                )}
            </div>
        </div>
    );
}

export default forwardRef((props, ref) => <NoteFilterBook {...props} fowardRef={ref} />);
