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

async function refreshToken(config: any, user: any) {
    try {
        const { data } = await authService.refresh();

        config.headers['Authorization'] = 'Bearer ' + data;

        localStorage.setItem('user', JSON.stringify({ ...user, accessToken: data }));
    } catch (error) {
        window.location.reload();
        await authService.logout();
    }
}

axiosClientSecret.interceptors.request.use(
    async (config: any) => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        const access_token = user.accessToken || '';

        if (access_token) {
            config.headers['Authorization'] = 'Bearer ' + access_token;
        }
        const tokenDecode: any = jwtDecode(access_token);
        const date = new Date();

        if (tokenDecode.exp < date.getTime() / 1000) {
            await refreshToken(config, user);
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
