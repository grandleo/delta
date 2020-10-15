export const config = {
    apiUrl: '/api/v1/worker',
    pathPrefix: '/worker',
    localStoragePrefix: 'worker',

    pusher: {
        forceTLS: true,
        authEndpoint: '/broadcasting/auth',
    },
};
