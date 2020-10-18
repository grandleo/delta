import { fetchClient } from '../_helpers';

export const notifService = {
    itemsFetch,
    markRead,
};

function itemsFetch() {
    const requestOptions = {
        url: 'notifs',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function markRead() {
    const requestOptions = {
        method: 'POST',
        url: 'notifs/mark-read',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
