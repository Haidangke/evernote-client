export interface Shortcut {
    _id: string;
    type: 'note' | 'notebook' | 'tag';
    typeId: string;
    name: string;

    createdAt: string;
    updatedAt: string;
}

export interface ShortcutParams {
    type: 'note' | 'notebook' | 'tag';
    typeId: string;
    name: string;
}
