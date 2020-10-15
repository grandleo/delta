import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { t, routes } from '../_helpers';

export const orderActions = {
    index,
    show,

    indexFilterSet,
    messageAddDirect,
};

function index() {
    return dispatch => {
        dispatch(request());

        return orderService.index()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.INDEX_REQUEST } }
    function success(payload) { return { type: orderConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: orderConstants.INDEX_FAILURE, error } }
}

function show(orderId) {
    return dispatch => {
        dispatch(request());

        return orderService.show(orderId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.SHOW_REQUEST } }
    function success(payload) { return { type: orderConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: orderConstants.SHOW_FAILURE, error } }
}

function indexFilterSet(filter) {
    const payload = filter;
    return { type: orderConstants.INDEX_FILTER_SET, payload };
}

function messageAddDirect(orderId, message) {
    const payload = {orderId, message};
    return { type: orderConstants.MESSAGE_ADD, payload };
}
