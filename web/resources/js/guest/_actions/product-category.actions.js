import { productCategoryConstants } from '../_constants';
import { productCategoryService } from '../_services';

export const productCategoryActions = {
    getById,
};

function getById(productCategoryId) {
    return dispatch => {
        dispatch(request());

        productCategoryService.getById(productCategoryId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.GETBYID_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.GETBYID_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.GETBYID_FAILURE, error } }
}
