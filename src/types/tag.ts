export interface Tag {
    _id: string;
    name: string;
}

export interface AddNoteParams {
    tags: string[];
    noteId: string;
}

export interface DeleteNoteParams {
    tag: string;
    noteId: string;
}
