import axios from 'axios';
import { fetchClient } from '../_helpers';

export const cartService = {
    getCurrent,
    checkout,
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

function handleResponse(response) {
    return response.data;
}
