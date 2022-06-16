import { ListParams, Note, Response, UpdateNoteParams, Tag } from 'types';
import axiosClientSecret from 'utils/axiosClientSecret';

const noteService = {
    get(id: string): Promise<Response<Note<Tag[]>>> {
        return axiosClientSecret.get(`/note/${id}`);
    },

    getAll(params?: ListParams): Promise<Response<Note<string>[]>> {
        return axiosClientSecret.get('/note', {
            params,
        });
    },

    create(notebookId?: string): Promise<Response<Note<string>>> {
        return axiosClientSecret.post('/note', { notebookId });
    },

    update(id: string, params: UpdateNoteParams): Promise<Response<Note<string>>> {
        return axiosClientSecret.put(`/note/${id}`, params);
    },

    delete(id: string): Promise<Response<null>> {
        return axiosClientSecret.delete(`/note/${id}`);
    },

    clean(): Promise<Response<null>> {
        return axiosClientSecret.delete('/note');
    },
};

export default noteService;
