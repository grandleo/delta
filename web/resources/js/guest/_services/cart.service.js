import axios from 'axios';
import { fetchClient } from '../_helpers';

export const cartService = {
    getCurrent,
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

function handleResponse(response) {
    return response.data;
}
