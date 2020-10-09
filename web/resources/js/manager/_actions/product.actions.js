import { productConstants } from '../_constants';
import { productService } from '../_services';
import { t, routes } from '../_helpers';

export const productActions = {
    index,
    show,
    update,
};

function index(productCategoryId) {
    return dispatch => {
        dispatch(request());

        return productService.index(productCategoryId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.INDEX_REQUEST } }
    function success(payload) { return { type: productConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: productConstants.INDEX_FAILURE, error } }
}

function show(productCategoryId, productId) {
    return dispatch => {
        dispatch(request());

        return productService.show(productCategoryId, productId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.SHOW_REQUEST } }
    function success(payload) { return { type: productConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: productConstants.SHOW_FAILURE, error } }
}

function update(productId, data, history) {
    return dispatch => {
        dispatch(request());

        return productService.update(productId, data)
            .then(
                payload => {
                    dispatch(success(payload));
                    if (productId === '0') {
                        history.push({
                            pathname: routes.makeRoute('prodEdit', [data.product_category_id, payload.productId]),
                            state: {from: routes.makeRoute('prodList', [data.product_category_id])},
                        });
                    }
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: productConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: productConstants.UPDATE_FAILURE, error } }
}
