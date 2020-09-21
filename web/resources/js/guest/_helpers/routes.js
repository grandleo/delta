import { config } from './';

export const routes = {
    home: config.pathPrefix + '/guest',

    login: config.pathPrefix + '/login',
    register: config.pathPrefix + '/register',

    orders: config.pathPrefix + '/orders',

    place: '/:placeSlug',
    placeServiceCategory: '/:placeSlug/:serviceCategorySlug',
};
