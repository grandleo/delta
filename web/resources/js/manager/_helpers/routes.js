import { config } from './';

const { pathPrefix: pp } = config;

export const routes = {
    home: pp,

    login: pp + '/login',
    register: pp + '/register',

    orders: pp + '/orders',
    finances: pp + '/finances',
    tables: pp + '/tables',
    menus: pp + '/menus',
    workers: pp + '/workers',
    guests: pp + '/guests',
    settings: pp + '/settings',
};
