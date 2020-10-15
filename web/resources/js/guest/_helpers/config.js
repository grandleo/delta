export const config = {
    storagePrefix: '/storage/',

    apiUrl: '/api/v1/guest',
    pathPrefix: '',
    localStoragePrefix: 'guest',

    pusher: {
        forceTLS: true,
        authEndpoint: '/broadcasting/auth',
    },
};
