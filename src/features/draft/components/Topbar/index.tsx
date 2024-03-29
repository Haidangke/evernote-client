import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import NoteMore from 'features/note/components/NoteMore';
import { TippyButton } from 'components/Tippy';
import { useAppSelector } from 'app/hooks';
import useLocationPage from 'hooks/useLocationPage';
import { FullSizeIcon, NoteMainIcon, NoteToIcon, RecycleFillIcon } from 'components/Icons';
import TopbarReminder from './TopbarReminder';

import styles from './Topbar.module.scss';
const cx = classNames.bind(styles);

function Topbar() {
    const page = useLocationPage();
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('n');

    const { listNote } = useAppSelector((state) => state.note);
    const { notebooks } = useAppSelector((state) => state.notebook);

    const notebook = useMemo(() => {
        const notebookId = listNote.find((note) => note._id === noteId)?.notebook;
        return notebooks.find((notebook) => notebook._id === notebookId);
    }, [noteId, listNote, notebooks]);

    const note = useMemo(() => {
        return listNote.find((note) => note._id === noteId);
    }, [listNote, noteId]);

    const handleExpandEditor = () => {
        const expand = JSON.parse(searchParams.get('fs') || 'false');

        if (expand) {
            searchParams.delete('fs');
        } else {
            searchParams.set('fs', 'true');
        }
        setSearchParams(searchParams);
    };

    if (!notebook) return <></>;

    return (
        <div className={cx('topbar')}>
            <div className={cx('left')}>
                <div className={cx('icon')} onClick={handleExpandEditor}>
                    <TippyButton content='Mở rộng ghi chú' placement='bottom'>
                        <FullSizeIcon />
                    </TippyButton>
                </div>
                <div className={cx('line')}></div>

                <TopbarReminder note={note} />

                <div className={cx('note')}>
                    {page === 'recycle' ? (
                        <div className={cx('note-btn')}>
                            <RecycleFillIcon />
                            <span>Thùng rác</span>
                        </div>
                    ) : (
                        <TippyButton
                            className={cx('note-btn')}
                            content='Di chuyển ghi chú'
                            placement='bottom'
                            height='100%'
                        >
                            <NoteMainIcon />
                            <span>{notebook?.name}</span>
                        </TippyButton>
                    )}

                    {page !== 'recycle' && (
                        <TippyButton
                            className={cx('icon-move')}
                            content='Di chuyển ghi chú'
                            placement='bottom'
                        >
                            <NoteToIcon />
                        </TippyButton>
                    )}
                </div>
            </div>
            <div className={cx('right')}>
                {page !== 'recycle' && (
                    <>
                        <div className={cx('info-auth')}>Chỉ bạn</div>
                        <div className={cx('share-btn')}>Chia sẻ</div>
                    </>
                )}
                <div className={cx('other-btn')}>{note && <NoteMore note={note} />}</div>
            </div>
        </div>
    );
}

export default Topbar;
