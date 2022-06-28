import axios from 'axios';
import jwtDecode from 'jwt-decode';
import authService from 'services/authService';
import { constants } from 'config';

const axiosClientSecret = axios.create({
    baseURL: constants.BASE_URL_API,
    headers: {
        Accepted: 'appication/json',
        'Content-Type': 'application/json',
    },
});

async function refreshToken(config: any) {
    try {
        const { data } = await authService.refresh();
        if (data) {
            config.headers['Authorization'] = 'Bearer ' + data;
            localStorage.setItem('access_token', data);
        }
    } catch (error) {
        window.location.reload();
        await authService.logout();
    }
}

axiosClientSecret.interceptors.request.use(
    async (config: any) => {
        const access_token = JSON.parse(localStorage.getItem('access_token') || '');

        if (access_token) {
            config.headers['Authorization'] = 'Bearer ' + access_token;
            const tokenDecode: any = jwtDecode(access_token);
            const date = new Date();

            if (tokenDecode.exp < date.getTime() / 1000) {
                await refreshToken(config);
            }
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClientSecret.interceptors.response.use(
    function (response) {
        return response.data.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClientSecret;
