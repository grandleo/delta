import { fetchClient } from '../_helpers';

export const orderService = {
    getAll,
    getById,
    sendMessage,
};

function getAll(params) {
    const requestOptions = {
        url: 'orders',
        params,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function getById(orderId) {
    const requestOptions = {
        url: `orders/${orderId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function sendMessage(orderId, message) {
    const requestOptions = {
        url: `orders/${orderId}/message`,
        method: 'POST',
        data: message,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
