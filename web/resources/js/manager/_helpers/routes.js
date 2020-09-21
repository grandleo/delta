import { config } from './';

export const routes = {
    home: config.pathPrefix,

    login: config.pathPrefix + '/login',
    register: config.pathPrefix + '/register',

    orders: config.pathPrefix + '/orders',
    finances: config.pathPrefix + '/finances',
    rooms: config.pathPrefix + '/rooms',
    menus: config.pathPrefix + '/menus',
    workers: config.pathPrefix + '/workers',
    guests: config.pathPrefix + '/guests',
    settings: config.pathPrefix + '/settings',
};
