import { fetchClient } from '../_helpers';

export const tableService = {
    index,
    show,
    update,
    destroy,
};

function index() {
    const requestOptions = {
        url: 'tables',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function show(tableId) {
    const requestOptions = {
        url: `tables/${tableId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function update(tableId, data) {
    const requestOptions = {
        method: 'PUT',
        url: `tables/${tableId}`,
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function destroy(tableId) {
    const requestOptions = {
        method: 'DELETE',
        url: `tables/${tableId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
