import { fetchClient, lsSetItem, lsRemoveItem, echoInit } from '../_helpers';

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
                if (payload.is_worker) {
                    localStorage.setItem('worker_token', payload.data.token);
                    const worker_state = JSON.stringify({'authentication': {'user': payload.data}});
                    localStorage.setItem('worker_state', worker_state);
                    location.href = '/worker';
                    return null;
                }
                lsSetItem('token', payload.data.token);
                echoInit();
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
                echoInit();
            }
            return payload;
        });
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
