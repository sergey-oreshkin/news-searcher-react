import axios from "axios";
import baseUrl, { storageKeys } from './APISetup';

const storage = window.localStorage;
const $axios = axios.create();

$axios.interceptors.request.use(config => {
    const token = storage.getItem(storageKeys.tokenKey);
    if (token) {
        config.headers.Authorization = token
    }
    return config;
});

$axios.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalConfig = error.config;
    const refresh = storage.getItem(storageKeys.refreshKey);
    if (refresh && (error.response.status === 403 || error.response.status === 401) && !error.config.retry) {
        error.config.retry = true;
        try {
            const endpoint = baseUrl + '/refresh';
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': refresh
                }
            }
            const response = await axios.get(endpoint, config);
            storage.setItem(storageKeys.tokenKey, response.data.token);
            storage.setItem(storageKeys.usernameKey, response.data.username);
            storage.setItem(storageKeys.refreshKey, response.data.refresh);
            return $axios(originalConfig);
        } catch (err) {
            err.response.data = 'Обновите страницу';
            throw err;
        }
    }
    throw error;
}
);

export default $axios;