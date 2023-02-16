import axios from "axios";

import { ACCESS_TOKEN_STORAGE_KEY, BASE_URL, REFRESH_TOKEN_STORAGE_KEY } from "./constants";

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

apiClient.interceptors.response.use(
    config => config,
    async (error) => {
        const refresh = window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
        const originalConfig = error.config;
        if (refresh && (error.response.status === 403 || error.response.status === 401) && !error.config.retry) {
            error.config.retry = true;
            try {
                const config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': refresh
                    }
                }
                const response = await axios.get(BASE_URL + '/refresh', config)
                window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, response.data.token);
                window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refresh);
                return apiClient(originalConfig);
            } catch (err) {
                throw err;
            }
        }
        throw error;
    }
);

export { apiClient };