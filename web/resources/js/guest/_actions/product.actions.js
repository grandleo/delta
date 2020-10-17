import { productConstants } from '../_constants';
import { productService } from '../_services';

export const productActions = {
    show,
};

function show(productId) {
    return dispatch => {
        dispatch(request());

        return productService.show(productId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.SHOW_REQUEST } }
    function success(payload) { return { type: productConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: productConstants.SHOW_FAILURE, error } }
}
