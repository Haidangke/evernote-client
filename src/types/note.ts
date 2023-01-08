import { Todo } from './todo';

export interface Note<T> {
    _id: string;
    title: string;
    content: string;
    contain: string[];
    todo?: Todo[];
    tags: T[];
    notebook: string;
    isTrash: boolean;
    createdAt: string;
    updatedAt: string;
    isShortcut: boolean;
}

export interface UpdateNoteParams {
    title?: string;
    content?: string;
    tags?: string[];
    notebook?: string;
    isTrash?: boolean;
    contain?: string[];
    createdAt?: string;
    isShortcut?: boolean;
}
