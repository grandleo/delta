import { fetchClient, lsSetItem, lsRemoveItem } from '../_helpers';

export const userService = {
    login,
    logout,
    register,

    show,
};

function login(data) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/login',
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('token', payload.data.token);
            }
            return payload;
        });
}

function logout() {
    lsRemoveItem('token', null);
}

function register(data) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/register',
        data,
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('token', payload.data.token);
            }
            return payload;
        });
}

function show(userId) {
    const requestOptions = {
        url: `user/${userId}`,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
