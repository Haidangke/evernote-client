import { Notebook, Response, UpdateNoteParams } from 'types';
import axiosClientSecret from 'utils/axiosClientSecret';

const notebookService = {
    get(): Promise<Response<Notebook>> {
        return axiosClientSecret.get('/notebook');
    },
    create(params: { name: string }) {
        return axiosClientSecret.post('/notebook', params);
    },
    update(id: string, params: UpdateNoteParams) {
        return axiosClientSecret.put(`/notebook/${id}`, params);
    },
    delete(id: string) {
        return axiosClientSecret.delete(`/notebook/${id}`);
    },
};

export default notebookService;
