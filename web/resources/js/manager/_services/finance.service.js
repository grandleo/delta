import { fetchClient } from '../_helpers';

export const financeService = {
    index,
};

function index() {
    const requestOptions = {
        url: 'finances',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
