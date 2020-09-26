import { config } from './';

const { pathPrefix: pp } = config;

export const routes = {
    home: pp + '/guest',

    login: pp + '/login',
    register: pp + '/register',

    orders: pp + '/orders',

    place: '/:placeSlug',

    placeCart: '/:placeSlug/cart',

    placeProductCategory: '/:placeSlug/:productCategorySlug',


    makeRoute(name, params) {
        switch(name) {
            case 'place':
                return '/' + params[0];
            case 'placeCart':
                return '/' + params[0] + '/cart';
            case 'placeProductCategory':
                return '/' + params[0] + '/' + params[1] + '-' + params[2];
            default:
                return pp + '/guest';
        }
    },
};
