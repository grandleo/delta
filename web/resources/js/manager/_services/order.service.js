import { fetchClient } from '../_helpers';

export const orderService = {
    index,
};

function index() {
    const requestOptions = {
        url: 'orders',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
