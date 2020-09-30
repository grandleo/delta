import { fetchClient } from '../_helpers';

export const productCategoryService = {
    getById,
};

function getById(productCategoryId) {
    const requestOptions = {
        url: `product-categories/${productCategoryId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
