import { fetchClient } from '../_helpers';

export const productService = {
    show,
};

function show(productId) {
    const requestOptions = {
        url: `products/${productId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
