import axiosClientSecret from 'services/axiosClientSecret';

const todoService = {
    create(params: { noteId: string }) {
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
