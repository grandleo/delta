import { orderConstants } from '../_constants';
import { orderService } from '../_services';

export const orderActions = {
    getAll,
    getById,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        orderService.getAll()
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

        orderService.getById(orderId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.GETBYID_REQUEST } }
    function success(payload) { return { type: orderConstants.GETBYID_SUCCESS, payload } }
    function failure(error) { return { type: orderConstants.GETBYID_FAILURE, error } }
}
