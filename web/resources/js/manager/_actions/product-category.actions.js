import { productCategoryConstants } from '../_constants';
import { productCategoryService } from '../_services';
import { alertActions } from './';
import { t, routes } from '../_helpers';

export const productCategoryActions = {
    index,
    show,
    update,
};

function index(placeId) {
    return dispatch => {
        dispatch(request());

        return productCategoryService.index(placeId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.INDEX_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.INDEX_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.INDEX_FAILURE, error } }
}

function show(placeId, productCategoryId) {
    return dispatch => {
        dispatch(request());

        return productCategoryService.show(placeId, productCategoryId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.SHOW_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.SHOW_FAILURE, error } }
}

function update(placeId, productCategoryId, data, history) {
    return dispatch => {
        dispatch(request());

        return productCategoryService.update(placeId, productCategoryId, data)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.itemAdd(
                        'success',
                        productCategoryId !== '0' ? t('Успешно сохранено!') : t('Успешно создано!'),
                        4000
                    ));
                    if (productCategoryId === '0') {
                        history.push(routes.makeRoute('prodCatEdit', [payload.productCategoryId]));
                    }
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productCategoryConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: productCategoryConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: productCategoryConstants.UPDATE_FAILURE, error } }
}
