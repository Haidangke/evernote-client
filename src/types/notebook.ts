export interface NotebookUpdate {
    name?: string;
    isDefault?: boolean;
}

export interface Notebook {
    _id: string;
    name: string;
    creator: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}
