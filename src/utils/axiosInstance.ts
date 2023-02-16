import axios from "axios";

import { BASE_URL } from "./constants";

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
});

export { apiClient };