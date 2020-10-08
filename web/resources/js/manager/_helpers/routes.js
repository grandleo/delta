import { config } from './';

const { pathPrefix: pp } = config;

export const routes = {
    home: pp,

    login: pp + '/login',
    register: pp + '/register',

    orders: pp + '/orders',
    finances: pp + '/finances',
    tables: pp + '/tables',

    prodCatList: pp + '/prodCat',
    prodCatEdit: pp + '/prodCat/:prCatId',

    prodList: pp + '/prodCat/:prCatId/list',
    prodEdit: pp + '/prodCat/:prCatId/:prId',

    workers: pp + '/workers',
    guests: pp + '/guests',
    settings: pp + '/settings',


    makeRoute(name, params) {
        switch(name) {
            case 'prodCatEdit':
                return pp + '/prodCat/' + params[0];
            case 'prodList':
                return pp + '/prodCat/' + params[0] + '/list';

            default:
                return pp;
        }
    },
};
