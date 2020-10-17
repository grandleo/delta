import { fetchClient } from '../_helpers';

export const placeService = {
    getAll,
    getById,
};

function getAll() {
    const requestOptions = {
        url: `places`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function getById(placeId, params) {
    const requestOptions = {
        url: `places/${placeId}`,
        params,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
