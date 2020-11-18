import { fetchClient, lsSetItem, lsRemoveItem } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    resetPassword,
    forgotPassword,

    update,
};

function login(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/login',
        data: inputs,
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

function register(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/register',
        data: inputs,
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('token', payload.data.token);
            }
            return payload;
        });
}

function forgotPassword(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/forgot-password',
        data: inputs,
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {

            return payload;
        });
}

function resetPassword(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/reset-password',
        data: inputs,
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('token', payload.data.token);
            }
            return payload;
        });
}

function update(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/update',
        data: inputs,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
