import axios from 'axios';
import jwtDecode from 'jwt-decode';
import authService from '~/services/authService';
import { constants } from '~/config';

const axiosClientSecret = axios.create({
    baseURL: constants.BASE_URL_API,
    headers: {
        Accepted: 'appication/json',
        'Content-Type': 'application/json',
    },
});

axiosClientSecret.interceptors.request.use(
    async (config: any) => {
        const access_token = localStorage.getItem('access_token') || '';

        if (access_token) {
            config.headers['Authorization'] = 'Bearer ' + access_token;
        }
        const tokenDecode: any = jwtDecode(access_token);
        const date = new Date();

        if (tokenDecode.exp < date.getTime() / 1000) {
            const data = await authService.refresh();

            config.headers['Authorization'] = 'Bearer ' + data;
            localStorage.setItem('access_token', data);
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClientSecret.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClientSecret;
