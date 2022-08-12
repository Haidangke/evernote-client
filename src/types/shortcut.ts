export interface Shortcut {
    _id: string;
    type: {
        _id: string;
        name: 'notebook' | 'tag' | 'note';
        value: 'n' | 'b' | 't';
    };
    name: string;

    createdAt: string;
    updatedAt: string;
}

export interface ShortcutParams {
    type: {
        _id: string;
        name: 'notebook' | 'tag' | 'note';
        value: 'n' | 'b' | 't';
    };
    name: string;
}
