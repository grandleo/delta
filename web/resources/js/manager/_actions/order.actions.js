import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { t, routes } from '../_helpers';

export const orderActions = {
    index,
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
