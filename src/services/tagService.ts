import { Note, Tag } from 'types';
import axiosClientSecret from 'services/axiosClientSecret';

const tagService = {
    getAll(): Promise<Tag[]> {
        return axiosClientSecret.get('/tag');
    },
    create(name: string): Promise<{ tag: Tag; listTag: Tag[] }> {
        return axiosClientSecret.post('/tag', { name });
    },

    delete(id: string): Promise<{ listNote: Note<Tag>[]; listTag: Tag[] }> {
        return axiosClientSecret.delete(`/tag/${id}`);
    },
};

export default tagService;
