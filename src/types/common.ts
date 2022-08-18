export interface Response<T> {
    status: 'success' | 'failed';
    msg: string;
    data?: T;
}

export type Topic = 'tag' | 'notebook' | 'note' | 'shortcut';

export interface FormAdd {
    name: string;
}
