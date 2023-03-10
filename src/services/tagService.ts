import { Note, Tag } from 'types';
import { axiosClientSecret } from 'services/axiosInstance';

const tagService = {
    getAll(): Promise<Tag[]> {
        return axiosClientSecret.get('/tag');
    },
    create(name: string): Promise<{ tag: Tag; listTag: Tag[] }> {
        return axiosClientSecret.post('/tag', { name });
    },

    remove(id: string): Promise<{ listNote: Note<Tag>[] }> {
        return axiosClientSecret.post(`/tag/${id}`);
    },
    delete(id: string): Promise<{ listNote: Note<Tag>[]; listTag: Tag[] }> {
        return axiosClientSecret.delete(`/tag/${id}`);
    },
};

export default tagService;
