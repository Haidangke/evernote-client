export interface Response<T> {
    status: 'success' | 'failed';
    msg: string;
    data?: T;
}

export type TopicValue = 'tag' | 'notebook' | 'note' | 'shortcut';

export interface FormAdd {
    name: string;
}
