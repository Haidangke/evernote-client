export interface Response<T> {
    status: 'success' | 'failed';
    msg: string;
    data?: T;
}
