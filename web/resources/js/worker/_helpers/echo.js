import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { config, lsGetItem } from './';

const token = lsGetItem('token');

const options = {
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: config.pusher.forceTLS,

    namespace: '',

    authEndpoint: config.pusher.authEndpoint,
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    },
};

export const echo = new Echo(options);