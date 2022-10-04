import { ListParams, Note, UpdateNoteParams, Tag } from 'types';
import axiosClientSecret from 'services/axiosClientSecret';

const noteService = {
    get(id: string): Promise<Note<Tag[]>> {
        return axiosClientSecret.get(`/note/${id}`);
    },

    getAll(params?: ListParams): Promise<Note<Tag>[]> {
        return axiosClientSecret.get('/note', {
            params,
        });
    },

    create(notebookId?: string): Promise<Note<Tag>> {
        return axiosClientSecret.post('/note', { notebookId });
    },

    update(id: string, params: UpdateNoteParams): Promise<Note<Tag>> {
        return axiosClientSecret.put(`/note/${id}`, params);
    },

    delete(id: string) {
        return axiosClientSecret.delete(`/note/${id}`);
    },

    deleteMany() {
        return axiosClientSecret.delete('/note');
    },
};

export default noteService;
