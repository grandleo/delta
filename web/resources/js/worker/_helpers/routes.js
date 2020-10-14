import { config } from './';

const { pathPrefix: pp } = config;

export const routes = {
    home: pp,

    login: pp + '/login',

    orderList: pp + '/order',
    orderEdit: pp + '/order/:orderId',


    makeRoute(name, params) {
        switch(name) {
            case 'orderEdit':
                return pp + '/order/' + params[0];

            default:
                return pp;
        }
    },
};
