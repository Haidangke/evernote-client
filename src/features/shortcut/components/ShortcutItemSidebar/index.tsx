import { Fragment, useMemo } from 'react';

import { useAppSelector } from 'app/hooks';
import { NotebookSubIcon, NoteSolidIcon, StarIcon } from 'assets/icons';
import MenuItem from 'layouts/components/Sidebar/Menu/MenuItem';

function ShortcutItemSidebar() {
    const { shortcuts } = useAppSelector((state) => state.shortcut);
    const { listNote } = useAppSelector((state) => state.note);

    const recentNotes = useMemo(
        () =>
            listNote
                .slice()
                .sort((x, y) => new Date(y?.updatedAt).getTime() - new Date(x?.updatedAt).getTime())
                .slice(0, listNote.length >= 5 ? 5 : listNote.length),
        [listNote]
    );
    return (
        <Fragment>
            <MenuItem
                icon={{ main: StarIcon }}
                topic={{ title: 'Lối tắt' }}
                types={['menu']}
                items={shortcuts.map((shortcut) => ({
                    name: shortcut.name,
                    _id: shortcut.type._id,
                    icon: NotebookSubIcon,
                    type: {
                        name: shortcut.type.name,
                        value: shortcut.type.value,
                    },
                    navigate: {
                        params: { an: true },
                    },
                }))}
                itemSub={{
                    heading: 'Ghi chú gần đây',
                    data: recentNotes.map((note) => ({
                        _id: note._id,
                        name: note.title,
                        icon: NoteSolidIcon,
                        type: {
                            name: 'note',
                            value: 'n',
                        },
                    })),
                }}
            />
        </Fragment>
    );
}

export default ShortcutItemSidebar;
