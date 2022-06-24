import { Todo } from './todo';

export interface Note<T> {
    _id: string;
    title: string;
    content: string;
    contain: string[];
    todo?: Todo[];
    tags: T;
    createdAt: string;
    updatedAt: string;
}

export interface ListParams {
    _page?: string;
    _limit?: string;
    _sort?: string;
    [key: string]: any;
}

export interface UpdateNoteParams {
    title?: string;
    content?: string;
    tags?: string[];
    notebook?: string;
    isDelete?: string;
    contain?: string;
}
