import { guestConstants } from '../_constants';
import { guestService } from '../_services';
import { t, routes } from '../_helpers';

export const guestActions = {
    index,
};

function index() {
    return dispatch => {
        dispatch(request());

        return guestService.index()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: guestConstants.INDEX_REQUEST } }
    function success(payload) { return { type: guestConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: guestConstants.INDEX_FAILURE, error } }
}
