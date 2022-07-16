import { Notebook, UpdateNotebookParams } from 'types';
import axiosClientSecret from 'utils/axiosClientSecret';

const notebookService = {
    getAll(): Promise<Notebook> {
        return axiosClientSecret.get('/notebook');
    },
    create(params: { name: string; creator: string }) {
        return axiosClientSecret.post('/notebook', params);
    },
    update(id: string, params: UpdateNotebookParams) {
        return axiosClientSecret.put(`/notebook/${id}`, params);
    },
    delete(id: string) {
        return axiosClientSecret.delete(`/notebook/${id}`);
    },
};

export default notebookService;
