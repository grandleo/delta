import { productCategoryConstants } from '../_constants';
import { productCategoryService } from '../_services';
import { t, routes } from '../_helpers';

export const productCategoryActions = {
    index,
    show,
    update,
};

function index() {
    return dispatch => {
        dispatch(request());

        return productCategoryService.index()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.INDEX_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.INDEX_FAILURE, error } }
}

function show(productCategoryId) {
    return dispatch => {
        dispatch(request());

        return productCategoryService.show(productCategoryId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.SHOW_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.SHOW_FAILURE, error } }
}

function update(productCategoryId, data, history) {
    return dispatch => {
        dispatch(request());

        return productCategoryService.update(productCategoryId, data)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push({
                        pathname: routes.prodCatList,
                        state: {from: routes.makeRoute('prodCatEdit', [payload.productCategoryId])},
                    });
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.UPDATE_FAILURE, error } }
}
