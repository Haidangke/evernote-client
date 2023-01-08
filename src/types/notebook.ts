export interface NotebookUpdate {
    name?: string;
    isDefault?: boolean;
    isShortcut?: boolean;
}

export interface Notebook {
    _id: string;
    name: string;
    creator: string;
    isDefault: boolean;
    isShortcut: boolean;
    createdAt: string;
    updatedAt: string;
}
