import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { fDateGetCurrent } from '../_helpers/strings';

export const orderActions = {
    getAll,
    getById,

    indexFilterSet,
    messageAdd,
    messageAddDirect,
};

function getAll(params, silent = false) {
    return dispatch => {
        if (!silent) {
            dispatch(request());
        }

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

function indexFilterSet(filter, silent = false) {
    const payload = {
        ...filter,
        silent,
    };
    return { type: orderConstants.INDEX_FILTER_SET, payload };
}

function messageAdd(orderId, message) {
    const payload = {
        orderId,
        message: {
            created_at: fDateGetCurrent(),
            is_system: false,
            id: Date.now(),
            ...message,
        },
    };
    return { type: orderConstants.MESSAGE_ADD, payload };
}

function messageAddDirect(orderId, message) {
    const payload = {orderId, message};
    return { type: orderConstants.MESSAGE_ADD, payload };
}
