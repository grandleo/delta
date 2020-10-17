import { orderConstants } from '../_constants';
import { orderService } from '../_services';

export const orderActions = {
    getAll,
    getById,

    indexFilterSet,
    messageAddDirect,
};

function getAll(params) {
    return dispatch => {
        dispatch(request());

        return orderService.getAll(params)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(payload) { return { type: orderConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}

function getById(orderId) {
    return dispatch => {
        dispatch(request());

        return orderService.getById(orderId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.GETBYID_REQUEST } }
    function success(payload) { return { type: orderConstants.GETBYID_SUCCESS, payload } }
    function failure(error) { return { type: orderConstants.GETBYID_FAILURE, error } }
}

function indexFilterSet(filter) {
    const payload = filter;
    return { type: orderConstants.INDEX_FILTER_SET, payload };
}

function messageAddDirect(orderId, message) {
    const payload = {orderId, message};
    return { type: orderConstants.MESSAGE_ADD, payload };
}
