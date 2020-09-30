import { fetchClient } from '../_helpers';

export const orderService = {
    getAll,
    getById,
};

function getAll() {
    const requestOptions = {
        url: 'orders',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function getById(orderId) {
    const requestOptions = {
        url: `orders/${orderId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
