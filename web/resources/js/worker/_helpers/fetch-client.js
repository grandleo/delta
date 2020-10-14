import axios from 'axios';
import { alertActions, userActions } from '../_actions';
import { config, lsGetItem, store, t } from './';

export function fetchClient() {
    const defaultOptions = {
        method: 'GET',
        baseURL: config.apiUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
    };

    // create instance
    const instance = axios.create(defaultOptions);

    // change config before every request if needed
    instance.interceptors.request.use(function (config) {
        const token = lsGetItem('token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

    instance.interceptors.response.use(function (response) {
        // all 2xx status codes
        displayOkMessage(response);

        return response;
    }, function (error) {
        // not 2xx status codes
        displayErrorMessage(error.response);

        console.log(error.response);
        if (error.response && error.response.status === 401) {
            store.dispatch(userActions.logout());
        }

        return Promise.reject(error);
    });

    return instance;
}

function displayOkMessage(response) {
    if (!response.data || !response.data.alerts) {
        return;
    }

    response.data.alerts.forEach((v) => {
        store.dispatch(alertActions.itemAdd(v.type, v.message, v.timeout || 5000));
    });
}

function displayErrorMessage(errorResponse) {
    if (!errorResponse) {
        return;
    }
    const errorData = errorResponse.data;

    let html = '<div class="">';
    if (errorData.errors) {
        let errors = errorData.errors
        html += '<ul class="list-unstyled m-0">';
        for (let field in errors) {
            errors[field].forEach((v) => {
                html += '<li>'+v+'</li>';
            });
        }
        html += '</ul>';
    } else if (errorData.trace) {
        html += `<b>${new Date}:</b> ` + t('Что-то пошло не так, попробуйте снова.');
        // let customMessage = { ...errorData };
        // customMessage.trace = '...';
        // html += `<p>${t('Возможно, это случайность, но, на всякий случай, сообщите разработчику:')}</p>`
        //     +`<p>${new Date}</p>`
        //     +`<p>${JSON.stringify(customMessage)}</p>`;
    } else if (errorData.message) {
        html += errorData.message;
    } else {
        html += t('Что-то пошло не так, попробуйте снова.');
    }
    html += '</div>';

    store.dispatch(alertActions.itemAdd('error', html, 5000));
}
