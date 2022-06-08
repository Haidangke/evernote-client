import { Response, Todo } from '~/types';
import axiosClientSecret from '~/utils/axiosClientSecret';

const todoService = {
    create(params: { noteId: string }): Promise<Response<Todo>> {
        return axiosClientSecret.post('/todo', params);
    },
    update(id: string) {
        return axiosClientSecret.put(`/todo/${id}`);
    },
    delete(id: string) {
        return axiosClientSecret.delete(`/todo/${id}`);
    },
};

export default todoService;
