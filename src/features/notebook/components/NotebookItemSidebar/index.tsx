import { useState } from 'react';

import { useAppSelector } from 'app/hooks';
import {
    NotebookAddIcon,
    NotebookIcon,
    NotebookSubDfIcon,
    NotebookSubIcon,
} from 'components/Icons';
import MenuItem from 'features/sidebar/components/Menu/MenuItem';
import NotebookAdd from '../NotebookAdd';

function NotebookItemSidebar() {
    const [isModal, setIsModal] = useState(false);
    const { notebooks } = useAppSelector((state) => state.notebook);

    return (
        <>
            <MenuItem
                navigate={{ path: '/notebooks' }}
                topic={{ title: 'Sổ tay', value: 'notebook' }}
                icon={{ main: NotebookIcon, add: NotebookAddIcon }}
                types={['link', 'menu']}
                onAdd={() => setIsModal(true)}
                menuSubs={[
                    {
                        _id: '1',
                        data:
                            notebooks.length === 0
                                ? []
                                : notebooks.map((notebook) => ({
                                      _id: notebook._id,
                                      name: notebook.name,
                                      icon: notebook.isDefault
                                          ? NotebookSubDfIcon
                                          : NotebookSubIcon,
                                      type: {
                                          name: 'notebook',
                                          value: 'b',
                                      },
                                      navigate: {
                                          params: {
                                              an: true,
                                          },
                                      },
                                  })),
                    },
                ]}
            />
            <NotebookAdd isModal={isModal} setIsModal={setIsModal} />
        </>
    );
}

export default NotebookItemSidebar;
