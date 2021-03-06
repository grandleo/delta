import { fetchClient } from '../_helpers';

export const productCategoryService = {
    index,
    show,
    update,
    destroy,

    resort,
};

function index() {
    const requestOptions = {
        url: 'product-categories',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function show(productCategoryId) {
    const requestOptions = {
        url: `product-categories/${productCategoryId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function update(productCategoryId, data) {
    const requestOptions = {
        method: 'PUT',
        url: `product-categories/${productCategoryId}`,
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function destroy(productCategoryId) {
    const requestOptions = {
        method: 'DELETE',
        url: `product-categories/${productCategoryId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function resort(data) {
    const requestOptions = {
        method: 'POST',
        url: 'product-categories/resort',
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
