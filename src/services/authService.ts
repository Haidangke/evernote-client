import { Response } from 'types';
import { LoginParams, RegisterParams, User } from 'types/auth';
import { axiosClient } from './axiosInstance';

const authService = {
    checkEmail(params: { email: string }): Promise<Response<boolean>> {
        return axiosClient.post('/auth/email', params);
    },
    login(params: LoginParams): Promise<Response<User>> {
        return axiosClient.post('/auth/login', params);
    },
    logout() {
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
