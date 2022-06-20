import { Response } from 'types';
import { LoginParams, RegisterParams, User } from 'types/auth';
import axiosClient from 'utils/axiosClient';

const authService = {
    async login(params: LoginParams): Promise<Response<User>> {
        return axiosClient.post('/auth/login', params);
    },
    logout() {
        localStorage.removeItem('user');
        return axiosClient.post('/auth/logout');
    },
    register(params: RegisterParams): Promise<Response<any>> {
        return axiosClient.post('/auth/register', params);
    },
    refresh(): Promise<Response<string>> {
        return axiosClient.post('/auth/refresh');
    },
};

export default authService;
