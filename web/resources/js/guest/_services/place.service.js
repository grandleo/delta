import { config, authHeader } from '../_helpers';

export const placeService = {
    getAll,
    getById,
    getServices
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/places`, requestOptions).then(handleResponse);
}

function getById(placeId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/places/${placeId}`, requestOptions).then(handleResponse);
}

function getServices(placeId, serviceCategoryId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/places/${placeId}/${serviceCategoryId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
