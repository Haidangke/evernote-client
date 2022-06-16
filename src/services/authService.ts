import { Response } from 'types';
import { LoginParams, RegisterParams, User } from 'types/auth';
import axiosClient from 'utils/axiosClient';

const authService = {
    async login(params: LoginParams): Promise<Response<User>> {
        const response = await axiosClient.post('/auth/login', params);
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout() {
        localStorage.removeItem('user');
        return axiosClient.post('/auth/logout');
    },
    register(params: RegisterParams) {
        return axiosClient.post('/auth/register', params);
    },
    refresh(): Promise<Response<string>> {
        return axiosClient.post('/auth/refresh');
    },
};

export default authService;
