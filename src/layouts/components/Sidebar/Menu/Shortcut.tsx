import { useAppSelector } from 'app/hooks';
import { NotebookSubIcon, StarIcon } from 'assets/icons';
import { Fragment } from 'react';
import MenuItem from './MenuItem';

function Shortcut() {
    const { shortcuts } = useAppSelector((state) => state.shortcut);
    const { listNote } = useAppSelector((state) => state.note);
    const recentNotes = listNote
        .sort((x, y) => new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime())
        .slice(0, 5);
    return (
        <Fragment>
            <MenuItem
                icon={{ main: StarIcon }}
                topic={{ title: 'Lối tắt', value: 'shortcuts' }}
                types={['menu']}
                items={
                    shortcuts
                        ? shortcuts.map((shortcut) => ({
                              name: shortcut.name,
                              _id: shortcut._id,
                              icon: NotebookSubIcon,
                              type: shortcut.type,
                          }))
                        : []
                }
                heading='Ghi chú gần đây'
            />
        </Fragment>
    );
}

export default Shortcut;
