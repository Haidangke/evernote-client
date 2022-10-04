import { AddNoteParams, DeleteNoteParams, Tag } from 'types';
import axiosClientSecret from 'services/axiosClientSecret';

const tagService = {
    getAll(): Promise<Tag[]> {
        return axiosClientSecret.get('/tag');
    },
    create(name: string) {
        return axiosClientSecret.post('/tag', { name });
    },

    addToNote(params: AddNoteParams) {
        return axiosClientSecret.put('/tag/note', params);
    },

    delete(id: string) {
        return axiosClientSecret.delete(`/tag/${id}`);
    },

    deleteToNote(params: DeleteNoteParams) {
        return axiosClientSecret.post('/tag/note', params);
    },
};

export default tagService;
