export interface Response<T> {
    status: 'success' | 'failed';
    msg: string;
    data?: T;
}

export type TopicValue = 'tag' | 'notebook' | 'note' | 'shortcut';

export interface FormAdd {
    name: string;
}

export interface ListParams {
    _page?: string;
    _limit?: string;
    _sort?: string;
    [key: string]: any;
}
