import { fetchClient } from '../_helpers';

export const productService = {
    index,
    show,
    update,
    destroy,

    resort,
};

function index(productCategoryId) {
    const requestOptions = {
        url: 'products',
        params: {
            product_category_id: productCategoryId
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function show(productCategoryId, productId) {
    const requestOptions = {
        url: `products/${productId}`,
        params: {
            product_category_id: productCategoryId
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function update(productId, data) {
    const requestOptions = {
        method: 'PUT',
        url: `products/${productId}`,
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function destroy(productCategoryId, productId) {
    const requestOptions = {
        method: 'DELETE',
        url: `products/${productId}`,
        params: {
            product_category_id: productCategoryId
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function resort(data) {
    const requestOptions = {
        method: 'POST',
        url: 'products/resort',
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
