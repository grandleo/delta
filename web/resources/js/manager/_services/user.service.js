import { fetchClient, lsSetItem, lsRemoveItem } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
};

function login(inputs) {
    const requestOptions = {
        method: 'POST',
        url: 'auth/login',
        data: { ...inputs },
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
        data: { ...inputs },
    };

    return fetchClient()(requestOptions).then(handleResponse)
        .then(payload => {
            if (payload.data.token) {
                lsSetItem('token', payload.data.token);
            }
            return payload;
        });
}

function handleResponse(response) {
    return response.data;
}
