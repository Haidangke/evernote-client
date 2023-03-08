import { ListParams, Note, UpdateNoteParams, Tag } from 'types';
import axiosClientSecret from 'services/axiosClientSecret';

const noteService = {
    getAll(params?: ListParams): Promise<Note<Tag>[]> {
        return axiosClientSecret.get('/note', {
            params,
        });
    },

    create(notebookId: string, params?: UpdateNoteParams): Promise<Note<Tag>> {
        return axiosClientSecret.post('/note', { notebookId, ...params });
    },

    update(id: string, params: UpdateNoteParams): Promise<Note<Tag>> {
        return axiosClientSecret.put(`/note/${id}`, params);
    },

    update2(note: Note<string>): Promise<Note<Tag>> {
        return axiosClientSecret.put(`/note/${note._id}`, { ...note });
    },

    delete(id: string) {
        return axiosClientSecret.delete(`/note/${id}`);
    },

    deleteMany() {
        return axiosClientSecret.delete('/note');
    },
};

export default noteService;
