export const config = {
    apiUrl: '/api/v1/manager',
    pathPrefix: '/manager',
    localStoragePrefix: 'manager',

    pusher: {
        forceTLS: true,
        authEndpoint: '/broadcasting/auth',
    },
};
