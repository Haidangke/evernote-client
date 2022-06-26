import { ListParams, Note, UpdateNoteParams, Tag } from 'types';
import axiosClientSecret from 'utils/axiosClientSecret';

const noteService = {
    get(id: string): Promise<Note<Tag[]>> {
        return axiosClientSecret.get(`/note/${id}`);
    },

    getAll(params?: ListParams): Promise<Note<Tag>[]> {
        return axiosClientSecret.get('/note', {
            params,
        });
    },

    create(notebookId?: string) {
        return axiosClientSecret.post('/note', { notebookId });
    },

    update(id: string, params: UpdateNoteParams) {
        return axiosClientSecret.put(`/note/${id}`, params);
    },

    delete(id: string) {
        return axiosClientSecret.delete(`/note/${id}`);
    },

    clean() {
        return axiosClientSecret.delete('/note');
    },
};

export default noteService;
