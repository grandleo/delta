import { fetchClient, routes, lsSetItem, lsRemoveItem, echoInit } from '../_helpers';

export const userService = {
    login,
    logout,

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
                echoInit();
            }
            return payload;
        });
}

function logout() {
    lsRemoveItem('token', null);
    location.href = routes.login;
}

function show() {
    const requestOptions = {
        url: 'user/0',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
