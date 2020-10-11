import { tableConstants } from '../_constants';
import { tableService } from '../_services';
import { t, routes } from '../_helpers';

export const tableActions = {
    index,
    show,
    update,
};

function index() {
    return dispatch => {
        dispatch(request());

        return tableService.index()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tableConstants.INDEX_REQUEST } }
    function success(payload) { return { type: tableConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: tableConstants.INDEX_FAILURE, error } }
}

function show(tableId) {
    return dispatch => {
        dispatch(request());

        return tableService.show(tableId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tableConstants.SHOW_REQUEST } }
    function success(payload) { return { type: tableConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: tableConstants.SHOW_FAILURE, error } }
}

function update(tableId, data, history) {
    return dispatch => {
        dispatch(request());

        return tableService.update(tableId, data)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push({
                        pathname: routes.tableList,
                        state: {from: routes.makeRoute('tableEdit', [payload.tableId])},
                    });
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tableConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: tableConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: tableConstants.UPDATE_FAILURE, error } }
}
