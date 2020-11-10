import {cartConstants, paymentConstants} from '../_constants';
import {paymentService} from '../_services';

export const paymentActions = {
    getCardsList,
    payForOrder,
};

function getCardsList() {
    return dispatch => {
        return paymentService.getCards()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: paymentConstants.CARDS_LIST_REQUEST } }
    function success(payload) { return { type: paymentConstants.CARDS_LIST_SUCCESS, payload } }
    function failure(error) { return { type: paymentConstants.CARDS_LIST_FAILURE, error } }
}

function payForOrder(orderId) {
    return dispatch => {
        return paymentService.paymentInit(orderId)
          .then(
            payload => dispatch(success(payload))
          );
    };

    function success(payload) { return { type: cartConstants.CHECKOUT_SETSTATUS_SUCCESS, payload } }
}
