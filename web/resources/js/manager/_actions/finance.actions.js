import { financeConstants } from '../_constants';
import { financeService } from '../_services';

export const financeActions = {
    index,
};

function index() {
    return dispatch => {
        dispatch(request());

        return financeService.index()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: financeConstants.INDEX_REQUEST } }
    function success(payload) { return { type: financeConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: financeConstants.INDEX_FAILURE, error } }
}
