import { placeConstants } from '../_constants';
import { placeService } from '../_services';

export const placeActions = {
    getAll,
    getById,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        placeService.getAll()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: placeConstants.GETALL_REQUEST } }
    function success(payload) { return { type: placeConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: placeConstants.GETALL_FAILURE, error } }
}

function getById(placeId) {
    return dispatch => {
        dispatch(request());

        placeService.getById(placeId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: placeConstants.GETBYID_REQUEST } }
    function success(payload) { return { type: placeConstants.GETBYID_SUCCESS, payload } }
    function failure(error) { return { type: placeConstants.GETBYID_FAILURE, error } }
}
