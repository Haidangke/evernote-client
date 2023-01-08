import { Fragment, useMemo } from 'react';

import MenuItem from 'features/sidebar/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import { NotebookSubIcon, NoteSolidSubIcon, StarIcon } from 'components/Icons';
import { MenuSubProps } from 'features/sidebar/components/Menu/MenuItem';

function ShortcutItemSidebar() {
    // const { shortcuts } = useAppSelector((state) => state.shortcut);
    const { listNote } = useAppSelector((state) => state.note);
    const { notebooks } = useAppSelector((state) => state.notebook);

    const listNoteShortcut: MenuSubProps = listNote
        .filter((note) => note.isShortcut)
        .map((note) => {
            return {
                topicValue: 'shortcut',
                name: note.title,
                _id: note._id,
                icon: NoteSolidSubIcon,
                type: {
                    name: 'note',
                    value: 'n',
                },
                navigate: {
                    path: '/note',
                },
            };
        });

    const listNotebookShortcut: MenuSubProps = notebooks
        .filter((notebook) => notebook.isShortcut)
        .map((note) => {
            return {
                topicValue: 'shortcut',
                name: note.name,
                _id: note._id,
                icon: NotebookSubIcon,
                type: {
                    name: 'notebook',
                    value: 'b',
                },
                navigate: {
                    path: '/notebook',
                    params: { an: true },
                },
            };
        });

    const recentNotes = useMemo(
        () =>
            [...listNote]
                .filter((note) => !note.isTrash)
                .sort((x, y) => new Date(y?.updatedAt).getTime() - new Date(x?.updatedAt).getTime())
                .slice(0, listNote.length >= 5 ? 5 : listNote.length),
        [listNote]
    );

    return (
        <Fragment>
            <MenuItem
                icon={{ main: StarIcon }}
                topic={{ title: 'Lối tắt', value: 'shortcut' }}
                types={['menu']}
                menuSubs={[
                    {
                        _id: '1',
                        data: [...listNoteShortcut, ...listNotebookShortcut],
                    },
                    {
                        _id: '2',
                        heading: 'Ghi chú gần đây',
                        data: recentNotes.map((note) => ({
                            _id: note._id,
                            name: note.title || 'Chưa có tiêu đề',
                            icon: NoteSolidSubIcon,
                            type: {
                                name: 'note',
                                value: 'n',
                            },
                            navigate: {
                                path: '/note',
                            },
                        })),
                    },
                ]}
            />
        </Fragment>
    );
}

export default ShortcutItemSidebar;
