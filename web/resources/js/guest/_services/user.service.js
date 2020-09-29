import { fetchClient, lsSetItem } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
};

function login(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth',
        data: { ...inputs },
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('user', payload.data);
            }
            return payload;
        });
}

function logout() {
    lsSetItem('user', null);
}

function register(inputs) {
    const requestOptions = {
        method: 'PUT',
        url: 'auth',
        data: { ...inputs },
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('user', payload.data);
            }
            return payload;
        });
}

function handleResponse(response) {
    return response.data;
}
