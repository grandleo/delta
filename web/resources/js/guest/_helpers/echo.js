import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { config, lsGetItem } from './';

export function echoInit() {
    const options = {
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: config.pusher.forceTLS,

        namespace: '',

        authEndpoint: config.pusher.authEndpoint,
        auth: {
            headers: {
                Authorization: `Bearer ${lsGetItem('token')}`,
                Accept: 'application/json',
            },
        },
    };

    window.echo = new Echo(options);
}
