import { fetchClient } from '../_helpers';

export const guestService = {
    index,
};

function index() {
    const requestOptions = {
        url: 'guests',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
