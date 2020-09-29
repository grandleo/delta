import { cartConstants } from '../_constants';
import { cartService } from '../_services';
import { alertActions } from './';

export const cartActions = {
    addToCart,
    paramsChange,
    getCurrent,
    checkout,
    checkoutSetGuestId,
    checkoutClear,
};

function addToCart(placeId, productId, price, changeQty) {
    return { type: cartConstants.ADD_ITEM, placeId, productId, price, changeQty };
}

function paramsChange(name, value) {
    return { type: cartConstants.PARAMS_CHANGE, name, value };
}

function getCurrent(placeId, productIds) {
    return dispatch => {
        dispatch(request());

        cartService.getCurrent(placeId, productIds)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: cartConstants.GETBYID_REQUEST } }
    function success(payload) { return { type: cartConstants.GETBYID_SUCCESS, payload } }
    function failure(error) { return { type: cartConstants.GETBYID_FAILURE, error } }
}

function checkout(placeId, tableId, products, params) {
    return dispatch => {
        dispatch(request());

        return cartService.checkout(placeId, tableId, products, params)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: cartConstants.CHECKOUT_REQUEST } }
    function success(payload) { return { type: cartConstants.CHECKOUT_SUCCESS, payload } }
    function failure(error) { return { type: cartConstants.CHECKOUT_FAILURE, error } }
}

function checkoutSetGuestId(orderId) {
    return dispatch => {
        return cartService.checkoutSetGuestId(orderId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(alertActions.itemAdd('error', error.toString()))
            );
    };

    function success(payload) { return { type: cartConstants.CHECKOUT_SETGUESTID_SUCCESS, payload } }
}

function checkoutClear(placeId) {
    return { type: cartConstants.CHECKOUT_CLEAR, placeId };
}
