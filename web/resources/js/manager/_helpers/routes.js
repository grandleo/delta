import { config } from './';

const { pathPrefix: pp } = config;

export const routes = {
    home: pp,

    login: pp + '/login',
    register: pp + '/register',
    forgotPassword: pp + '/forgot-password',
    resetPassword: pp + '/reset-password/:token',

    orderList: pp + '/order',
    orderEdit: pp + '/order/:orderId',

    finances: pp + '/finances',

    tableList: pp + '/table',
    tableEdit: pp + '/table/:tableId',

    prodCatList: pp + '/prodCat',
    prodCatEdit: pp + '/prodCat/:prCatId',

    prodList: pp + '/prodCat/:prCatId/list',
    prodEdit: pp + '/prodCat/:prCatId/:prId',

    workerList: pp + '/worker',
    workerEdit: pp + '/worker/:workerId',

    guestList: pp + '/guest',
    guestEdit: pp + '/guest/:guestId/',

    settings: pp + '/settings',


    makeRoute(name, params) {
        switch(name) {
            case 'resetPassword':
                return pp + '/reset-password/' + params[0];
            case 'orderEdit':
                return pp + '/order/' + params[0];
            case 'tableEdit':
                return pp + '/table/' + params[0];
            case 'prodCatEdit':
                return pp + '/prodCat/' + params[0];
            case 'prodList':
                return pp + '/prodCat/' + params[0] + '/list';
            case 'prodEdit':
                return pp + '/prodCat/' + params[0] + '/' + params[1];
            case 'workerEdit':
                return pp + '/worker/' + params[0];
            case 'guestEdit':
                return pp + '/guest/' + params[0];

            default:
                return pp;
        }
    },
};
