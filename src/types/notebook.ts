export interface NotebookUpParams {
    name?: string;
    isDefault: string;
}

export interface Notebook {
    _id: string;
    name: string;
    isDefault: boolean;
}
