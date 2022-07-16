export interface UpdateNotebookParams {
    name?: string;
    isDefault?: string;
}

export interface Notebook {
    _id: string;
    name: string;
    creator: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}
