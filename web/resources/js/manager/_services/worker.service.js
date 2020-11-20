import { fetchClient } from '../_helpers';

export const workerService = {
    index,
    show,
    update,
    destroy,
    restore,
};

function index() {
    const requestOptions = {
        url: 'workers',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function show(workerId) {
    const requestOptions = {
        url: `workers/${workerId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function update(workerId, data) {
    const requestOptions = {
        method: 'PUT',
        url: `workers/${workerId}`,
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function destroy(workerId) {
    const requestOptions = {
        method: 'DELETE',
        url: `workers/${workerId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function restore(workerId) {
    const requestOptions = {
        method: 'GET',
        url: `workers/${workerId}/restore`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
