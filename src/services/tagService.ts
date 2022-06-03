import { AddNoteParams, DeleteNoteParams, Response, Tag } from '~/types';
import axiosClientSecret from '~/utils/axiosClientSecret';

const tagApi = {
    create(name: string): Promise<Response<Tag>> {
        return axiosClientSecret.post('/tag', { name });
    },

    addToNote(params: AddNoteParams) {
        return axiosClientSecret.put('/tag/note', params);
    },

    delete(id: string) {
        return axiosClientSecret.delete(`/tag/${id}`);
    },

    deleteToNote(params:DeleteNoteParams) {
        return axiosClientSecret.post('/tag/note', params);
    },
};

export default tagApi;
