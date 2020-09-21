import { placeConstants } from '../_constants';
import { routes } from '../_helpers';
import { placeService } from '../_services';

export const placeActions = {
    getAll,
    getById,
    getServices
};

function getAll() {
    return dispatch => {
        dispatch(request());

        placeService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: placeConstants.GETALL_REQUEST } }
    function success(items) { return { type: placeConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: placeConstants.GETALL_FAILURE, error } }
}

function getById(placeId) {
    return dispatch => {
        dispatch(request());

        placeService.getById(placeId)
            .then(
                current => dispatch(success(current)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: placeConstants.GETBYID_REQUEST } }
    function success(current) { return { type: placeConstants.GETBYID_SUCCESS, current } }
    function failure(error) { return { type: placeConstants.GETBYID_FAILURE, error } }
}


function getServices(placeId, serviceCategoryId) {
    return dispatch => {
        dispatch(request());

        placeService.getServices(placeId, serviceCategoryId)
            .then(
                currentServiceCategory => dispatch(success(currentServiceCategory)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: placeConstants.GETSERVICES_REQUEST } }
    function success(currentServiceCategory) { return { type: placeConstants.GETSERVICES_SUCCESS, currentServiceCategory } }
    function failure(error) { return { type: placeConstants.GETSERVICES_FAILURE, error } }
}
