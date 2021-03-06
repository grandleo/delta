import { config } from './';

const { pathPrefix: pp } = config;

export const routes = {
    home: pp + '/guest',

    login: pp + '/login',
    register: pp + '/register',

    profile: pp + '/profile',
    profileCards: pp + '/profile-cards',
    profileAddCard: '/profile-add-card',

    orders: pp + '/orders',
    order: pp + '/order/:orderId',

    place: '/:placeSlug',

    placeCart: '/:placeSlug/cart',
    placeCartCheckout: '/:placeSlug/cart-checkout',
    placeCartPayment: '/:placeSlug/cart-payment',

    placeProduct: '/:placeSlug/pr-:productSlug',

    placeProductCategory: '/:placeSlug/:productCategorySlug',


    makeRoute(name, params) {
        switch(name) {
            case 'order':
                return pp + '/order/' + params[0];
            case 'place':
                return '/' + params[0];
            case 'placeCart':
                return '/' + params[0] + '/cart';
            case 'placeCartCheckout':
                return '/' + params[0] + '/cart-checkout';
            case 'placeCartPayment':
                return '/' + params[0] + '/cart-payment';
            case 'placeProduct':
                return '/' + params[0] + '/pr-' + params[1] + '-' + params[2];
            case 'placeProductCategory':
                return '/' + params[0] + '/' + params[1] + '-' + params[2];
            default:
                return pp + '/guest';
        }
    },
};
