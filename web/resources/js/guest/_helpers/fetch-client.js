import axios from 'axios';
import { config } from './';

export function fetchClient() {
    const defaultOptions = {
        method: 'GET',
        baseURL: config.apiUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
    };

    // create instance
    const instance = axios.create(defaultOptions);

    // change config before every request if needed
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('guest_token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
}
