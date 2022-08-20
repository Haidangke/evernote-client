import axios from 'axios';
import jwtDecode from 'jwt-decode';
import authService from 'services/authService';
import { constants } from 'config';
import { store } from 'app/store';
import { authActions } from 'features/auth/authSlice';

const axiosClientSecret = axios.create({
    baseURL: constants.BASE_URL_API,
    headers: {
        Accepted: 'appication/json',
        'Content-Type': 'application/json',
    },
});

function refreshToken(config: any) {
    authService
        .refresh()
        .then((res) => {
            const access_token = res.data;
            if (access_token) {
                config.headers['Authorization'] = 'Bearer ' + access_token;
                localStorage.setItem('access_token', access_token);
            }
        })
        .catch(() => {
            authService.logout();
            store.dispatch(authActions.logout());
        });
}

axiosClientSecret.interceptors.request.use(
    async (config: any) => {
        const access_token = JSON.parse(localStorage.getItem('access_token') || '');

        if (access_token) {
            const tokenDecode: any = jwtDecode(access_token);
            const date = new Date();

            if (tokenDecode.exp < date.getTime() / 1000) {
                refreshToken(config);
            } else {
                config.headers['Authorization'] = 'Bearer ' + access_token;
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
