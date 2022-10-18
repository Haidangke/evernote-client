import axios from 'axios';
import { BASE_URL_API } from 'config/constants';

const axiosClient = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        Accepted: 'appication/json',
        'Content-Type': 'application/json',
    },
});

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
