export interface Todo {
    _id: string;
    uid: string;
    nodeId: string;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoUpdateParams {
    noteId: string;
    name?: string;
    expiration_date?: Date;
    isComplete?: string;
}
