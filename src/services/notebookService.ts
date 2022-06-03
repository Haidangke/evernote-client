import { UpdateNoteParams } from '~/types';
import axiosClientSecret from '~/utils/axiosClientSecret';

const notebookApi = {
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

export default notebookApi;
