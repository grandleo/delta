import { fetchClient } from '../_helpers';

export const productCategoryService = {
    index,
    show,
    update,
    resort,
};

function index(placeId) {
    const requestOptions = {
        url: 'product-categories',
        params: {place_id: placeId},
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function show(placeId, productCategoryId) {
    const requestOptions = {
        url: `product-categories/${productCategoryId}`,
        params: {place_id: placeId},
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function update(placeId, productCategoryId, data) {
    const requestOptions = {
        method: 'PUT',
        url: `product-categories/${productCategoryId}`,
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function resort(placeId, data) {
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
