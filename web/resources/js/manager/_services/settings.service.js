import { fetchClient } from '../_helpers';

export const settingsService = {
    show,
    update,
};

function show(placeId) {
    const requestOptions = {
        url: `settings/${placeId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function update(placeId, data) {
    const requestOptions = {
        method: 'PUT',
        url: `settings/${placeId}`,
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
