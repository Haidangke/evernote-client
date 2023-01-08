import { Notebook, NotebookUpdate } from 'types';
import axiosClientSecret from 'services/axiosClientSecret';

const notebookService = {
    getAll(): Promise<Notebook> {
        return axiosClientSecret.get('/notebook');
    },
    create(params: { name: string; creator: string }) {
        return axiosClientSecret.post('/notebook', params);
    },
    update(id: string, params: NotebookUpdate): Promise<Notebook> {
        return axiosClientSecret.put(`/notebook/${id}`, params);
    },
    delete(id: string) {
        return axiosClientSecret.delete(`/notebook/${id}`);
    },
};

export default notebookService;
