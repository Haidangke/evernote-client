import axios from 'axios';
import { constants } from 'config';

const axiosClient = axios.create({
    baseURL: constants.BASE_URL_API,
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
