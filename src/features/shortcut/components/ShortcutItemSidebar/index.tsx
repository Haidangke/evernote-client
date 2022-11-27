import { Fragment, useMemo } from 'react';

import MenuItem from 'features/sidebar/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import { NotebookSubIcon, NoteSolidSubIcon, StarIcon } from 'components/Icons';

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
                topic={{ title: 'Lối tắt', value: 'shortcut' }}
                types={['menu']}
                menuSubs={[
                    {
                        _id: '1',

                        data: shortcuts.map((shortcut) => {
                            let ShortcutIcon = NotebookSubIcon;
                            if (shortcut.type.name === 'note') {
                                ShortcutIcon = NoteSolidSubIcon;
                            }

                            return {
                                topicValue: 'shortcut',
                                name: shortcut.name,
                                _id: shortcut.type._id,
                                icon: ShortcutIcon,
                                type: {
                                    name: shortcut.type.name,
                                    value: shortcut.type.value,
                                },
                                navigate: {
                                    path: `/${shortcut.type.name}`,
                                    params: shortcut.type.name !== 'note' ? { an: true } : {},
                                },
                            };
                        }),
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
