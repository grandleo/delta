import { workerConstants } from '../_constants';
import { workerService } from '../_services';
import { t, routes } from '../_helpers';

export const workerActions = {
    index,
    show,
    update,
};

function index() {
    return dispatch => {
        dispatch(request());

        return workerService.index()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: workerConstants.INDEX_REQUEST } }
    function success(payload) { return { type: workerConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: workerConstants.INDEX_FAILURE, error } }
}

function show(workerId) {
    return dispatch => {
        dispatch(request());

        return workerService.show(workerId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: workerConstants.SHOW_REQUEST } }
    function success(payload) { return { type: workerConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: workerConstants.SHOW_FAILURE, error } }
}

function update(workerId, data, history) {
    return dispatch => {
        dispatch(request());

        return workerService.update(workerId, data)
            .then(
                payload => {
                    dispatch(success(payload));
                    if (workerId === '0') {
                        history.push({
                            pathname: routes.makeRoute('workerEdit', [payload.workerId]),
                            state: {from: routes.workerList},
                        });
                    }
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: workerConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: workerConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: workerConstants.UPDATE_FAILURE, error } }
}
