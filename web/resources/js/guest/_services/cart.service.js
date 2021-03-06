import { fetchClient } from '../_helpers';

export const cartService = {
    getCurrent,
    checkout,
    checkoutSetGuestId,
    checkoutSetStatus,
};

function getCurrent(placeId, productIds) {
    const requestOptions = {
        url: 'cart',
        params: {
            placeId,
            productIds,
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function checkout(placeId, tableId, products, params) {
    const requestOptions = {
        method: 'POST',
        url: 'cart',
        data: {
            placeId,
            tableId,
            products,
            params,
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function checkoutSetGuestId(orderId) {
    const requestOptions = {
        method: 'PUT',
        url: 'cart/'+orderId,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function checkoutSetStatus(orderId, status) {
    const requestOptions = {
        method: 'PUT',
        url: 'cart/'+orderId,
        data: {
            status,
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
